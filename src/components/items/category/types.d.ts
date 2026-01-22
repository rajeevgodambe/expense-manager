import Category from "../../../database/models/category";

export interface CategoryItemProps {
  category: Category;
  onDelete?: (category: Category) => void;
  onPress?: (category: Category) => void;
}
