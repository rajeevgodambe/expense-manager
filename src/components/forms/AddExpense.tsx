import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Switch, Pressable } from "react-native";

import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import { AddExpenseFormProps } from "./types";
import { Picker } from '@react-native-picker/picker';
import Input from "../input/Input";
import commonStyles from "../../styles/commonStyles";
import Button from "../button/CustomButton";
import { useForm, Controller } from "react-hook-form";
import ThemedText from "../text/ThemedText";
import Category from "../../database/models/category";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDatabase } from "@nozbe/watermelondb/hooks";


const AddExpense: React.FC<AddExpenseFormProps> = ({ onAdd, onClose, expense = null }) => {
    const theme = useTheme();
    const database = useDatabase();
    const [show, setShow] = useState(false);
    const styles = createStyles(theme);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await database.collections
                .get<Category>("categories")
                .query()
                .fetch();   // <-- fetch once

            setCategories(result);
        };

        fetchCategories();
    }, [database]);

    const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        defaultValues: {
            amount: "",
            category: {},
            description: "",
            date: new Date()
        },
    });

    const assignDefaults = async () => {
        if (expense) {
            const category = await database.collections
                .get<Category>("categories")
                .find(expense.categoryId);
            reset({
                amount: String(expense.amount),
                category: category,
                description: expense.note ?? "",
                date: new Date(expense.date),
            });
        } else {
            reset({
                amount: "",
                category: "",
                description: "",
                date: new Date(),
            });
        }
    }

    useEffect(() => {
        assignDefaults();
    }, [expense, reset]);


    const onSubmit = (data: any) => {
        onAdd(data);
    };



    return (
        <View style={styles.overlay}>
            <View style={styles.modalBox}>
                <Text style={styles.title}>{`${expense ? 'Update' : 'Add'} Expense`}</Text>

                <View style={{ paddingBottom: 12 }}>
                    <Controller
                        control={control}
                        name="amount"
                        rules={{
                            required: "Amount is required",
                            validate: (value) => {
                                const num = Number(value);
                                if (isNaN(num)) return "Invalid amount";
                                if (num <= 0) return "Amount must be greater than 0";
                                return true;
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Amount"
                                keyboardType="numeric"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors?.amount && <ThemedText style={{ color: "red" }}>{errors?.amount?.message}</ThemedText>}
                </View>
                <View style={{ paddingBottom: 12 }}>
                    <View
                        style={{
                            height: 50,
                            borderWidth: 1,
                            borderColor: theme.colors.border,
                            borderRadius: 10,
                            justifyContent: 'center',
                            paddingHorizontal: 8,
                            // marginBottom: 15,
                            backgroundColor: theme.colors.inputBg,
                            color: theme.colors.text,
                        }}
                    >
                        <Controller
                            control={control}
                            name="category"
                            rules={{
                                required: "Category is required",
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                >
                                    <Picker.Item label="Select Category" value="" />
                                    {categories.map((cat) => (
                                        <Picker.Item key={cat.id} label={cat.name} value={cat} />
                                    ))}
                                </Picker>
                            )}
                        />
                    </View>
                    {errors?.category && <ThemedText style={{ color: "red" }}>{errors?.category?.message}</ThemedText>}
                </View>
                <View style={{ paddingBottom: 12, justifyContent: 'center', alignContent: 'center' }}>
                    <Controller
                        control={control}
                        name="date"

                        defaultValue={new Date()}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TouchableOpacity onPress={() => setShow(true)}>
                                    <View
                                        style={{
                                            height: 50,
                                            borderWidth: 1,
                                            borderColor: theme.colors.border,
                                            borderRadius: 10,
                                            paddingHorizontal: 8,
                                            backgroundColor: theme.colors.inputBg,
                                            justifyContent: "center", // works here
                                        }}
                                    >
                                        <ThemedText>
                                            {value ? value.toDateString() : "Select Expense Date"}
                                        </ThemedText>
                                    </View>
                                </TouchableOpacity>

                                {show && (
                                    <DateTimePicker
                                        value={value || new Date()}
                                        mode="date"
                                        onChange={(event, selectedDate) => {
                                            setShow(false);
                                            if (selectedDate) onChange(selectedDate);
                                        }}
                                    />
                                )}
                            </>
                        )}
                    />
                </View>


                <View style={{ paddingBottom: 12 }}>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Description"
                                multiline
                                numberOfLines={4}
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                </View>

                <View style={[commonStyles.row, commonStyles.spaceBetween, commonStyles.gap12]}>
                    <Button
                        title="Close"
                        outlined
                        onPress={() => {
                            reset();
                            onClose();
                        }}
                    />
                    <Button
                        disabled={!isValid}
                        title="Add"
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </View>
        </View>
    )
}

export { AddExpense }