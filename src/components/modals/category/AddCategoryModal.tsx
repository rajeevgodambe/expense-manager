import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Switch, Pressable } from "react-native";
import { AddCategoryModalProps, CategoryType } from "./types";
import { createStyles } from "./styles";
import { useTheme } from "@react-navigation/native";
import commonStyles from "../../../styles/commonStyles";
import Input from "../../input/Input";
import Button from "../../button/CustomButton";

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ visible, onClose, onAdd }) => {
    const [name, setName] = useState<string>("");
    const [type, setType] = useState<CategoryType>("expense");
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.title}>Add Category</Text>

                        <Input
                            placeholder="Category Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <View style={[commonStyles.row, commonStyles.spaceBetween, commonStyles.gap12, {marginTop: 12}]}>
                            <Button
                                title="Close"
                                outlined
                                onPress={onClose}
                            />
                            <Button
                                disabled={!name}
                                title="Add"
                                onPress={() => {
                                    onAdd(name, type);
                                    setName("");
                                    onClose();
                                }}
                            />

                        </View>
                    </View>
                </View>
        </Modal>
    );
};

export default AddCategoryModal;
