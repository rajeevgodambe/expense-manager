import Category from "../../../database/models/category";
import Expense from "../../../database/models/expense";

export interface ExpenseItemProps {
  expense: Expense | any;
  categoryName: string;
  onDelete?: (category: Expense) => void;
  onPress?: (category: Expense) => void;
}
