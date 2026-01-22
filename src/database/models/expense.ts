import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import User from "./user";
import Category from "./category";

export default class Expense extends Model {
  static table = "expenses";

  @field("amount") amount!: number;
  @field("note") note!: string;
  @field("date") date!: number;

  @field("user_id") userId!: string;
  @field("category_id") categoryId!: string;

  @relation("users", "user_id") user!: User;
  @relation("categories", "category_id") category!: Category;
}
