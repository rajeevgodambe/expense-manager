import Expense from "../../database/models/expense";

export type CategoryType = "income" | "expense";

export type AddExpenseFormProps = {
  onClose: () => void;
  onAdd: (data: any) => void;
  expense?: Expense | null;
};
