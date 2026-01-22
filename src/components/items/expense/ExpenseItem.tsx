import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { createExpenseItemStyles } from './styles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import IncomeIcon from '../../../assets/icons/income.svg';
import ExpenseIcon from '../../../assets/icons/expense.svg';
import { useTheme } from '@react-navigation/native';
import { ExpenseItemProps } from './types';
import ThemedText from '../../text/ThemedText';
import { formatCurrency } from '../../../utils/utils';


const ExpenseItem: React.FC<ExpenseItemProps> = ({
  expense,
  onDelete,
  onPress,
  categoryName
}) => {
  const theme = useTheme();
  const expenseStyles = createExpenseItemStyles(theme);
  const expenseDate = new Date(expense.date).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  return (
    <TouchableOpacity
      style={expenseStyles.card}
      activeOpacity={0.8}
      onPress={() => onPress?.(expense)}
    >
      <View style={expenseStyles.iconWrapper}>
        <ExpenseIcon />
      </View>
      <View style={expenseStyles.content}>
        <ThemedText style={expenseStyles.title}>{expense.note || categoryName}</ThemedText>
        <ThemedText style={expenseStyles.subtitle}>
          {categoryName}
        </ThemedText>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <ThemedText style={[{ textAlign: 'right', color: 'red', fontWeight: 500 }]}>
          {formatCurrency(expense.amount)}
        </ThemedText>

        <ThemedText style={[expenseStyles.subtitle, { textAlign: 'right' }]}>
          {expenseDate}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseItem;
