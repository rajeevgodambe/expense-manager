export type CategoryType = "income" | "expense";

export type AddCategoryModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, type: CategoryType) => void;
};
