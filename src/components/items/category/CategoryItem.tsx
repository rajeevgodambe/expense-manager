import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import { CategoryItemProps } from './types';
import { createCategoryItemStyles } from './styles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import IncomeIcon from '../../../assets/icons/income.svg';
import ExpenseIcon from '../../../assets/icons/expense.svg';
import { useTheme } from '@react-navigation/native';


const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  onDelete,
  onPress,
}) => {
  const theme = useTheme();
  const categoryItemStyles = createCategoryItemStyles(theme);
  return (
    <TouchableOpacity
      style={categoryItemStyles.card}
      activeOpacity={0.8}
      onPress={() => onPress?.(category)}
    >
      <View style={categoryItemStyles.iconWrapper}>
        {category.is_income ? <IncomeIcon /> : <ExpenseIcon />}
      </View>
      <View style={categoryItemStyles.content}>
        <Text style={categoryItemStyles.title}>{category.name}</Text>
        <Text style={categoryItemStyles.subtitle}>
          {category.is_income ? 'Income' : 'Expense'}
        </Text>
      </View>

      <View style={categoryItemStyles.actions}>
        {!category.is_system && (
          <TouchableOpacity
            onPress={() => onDelete?.(category)}
            hitSlop={10}
          >
            <MaterialDesignIcons
              name="trash-can-outline"
              size={22}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;
