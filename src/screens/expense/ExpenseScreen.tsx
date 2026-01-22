import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal } from "react-native";
import Card from "../../components/card/Card";
import Button from "../../components/button/CustomButton";
import Expense from "../../database/models/expense";
import ThemedText from "../../components/text/ThemedText";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import Category from "../../database/models/category";
import { addNewCategory } from "../../services/categoryService";
import commonStyles from "../../styles/commonStyles";
import IconButton from "../../components/button/IconButton";
import { typography } from "../../styles/typography";
import ExpenseItem from "../../components/items/expense/ExpenseItem";
import { AddExpense } from "../../components/forms/AddExpense";
import { addNewExpense, updateExpense } from "../../services/expenseService";
import { Empty } from "../../components/messageScreens/Empty";
import { Q } from "@nozbe/watermelondb";
import { AuthContext } from "../../navigation/AuthContext";


export const ExpenseScreen = () => {
    const database = useDatabase();
    const {user} = useContext(AuthContext);

    const [expenses, setExpenses] = useState<any[]>([]);
    const [addExpense, toggleAddExpense] = useState<boolean>(false);
    const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
    const [selectedExpense, setSelectedExpense] = useState<Expense|null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            const categories = await database.collections
                .get<Category>("categories")
                .query(Q.where("user_id", user?.id))
                .fetch();

            const map: Record<string, string> = {};
            categories.forEach(cat => {
                map[cat.id] = cat.name;
            });

            setCategoryMap(map);
        };

        loadCategories();
    }, [database]);

    useEffect(() => {
        const query = database.collections
            .get<Expense>("expenses")
            .query(Q.where("user_id", user?.id));

        const subscription = query.observe().subscribe((result: Expense[]) => {
            setExpenses(result);

        });

        return () => subscription.unsubscribe();
    }, [database, categoryMap]);

    const onAdd = (data: any) => {
        if (!user) {
            return
        }
        if (selectedExpense) {
            updateExpense(user, selectedExpense, data);
        } else {
            addNewExpense(user, data);
        }
        
        toggleAddExpense(false)
    }

    const onExpensePress = (expense: Expense) => {
        console.log("Came Here");
        toggleAddExpense(true);
        setSelectedExpense(expense)
    }

    const onClose = () => {
        setSelectedExpense(null);
        toggleAddExpense(false)
    }

    return (
        <View style={commonStyles.container}>
            <View style={[commonStyles.row, commonStyles.spaceBetween, commonStyles.alignCenter]}>
                <ThemedText style={[typography.heading]}>Transactions</ThemedText>
                <IconButton onPress={() => {
                    toggleAddExpense(true);
                }} iconName="plus" />
            </View>
            <View style={{ marginTop: 20, flex: 1 }}>
                {
                    expenses.length == 0?
                     <Empty message="No expenses found" />
                    : <FlatList
                        data={expenses}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <ExpenseItem categoryName={categoryMap[item.categoryId]} onPress={onExpensePress} expense={item} />}
                        style={{
                            marginBottom: 16
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                }
            </View>
            <Modal visible={addExpense} animationType="fade" transparent>
                <AddExpense
                    onClose={onClose}
                    onAdd={(data) => {
                        onAdd(data);
                    }}
                    expense={selectedExpense}
                />
            </Modal>
        </View>
    )
}
