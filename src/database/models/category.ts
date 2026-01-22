import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";

export default class Category extends Model {
  static table = "categories";

  @field("name") name!: string;
  @field("is_income") is_income!: boolean;
  @field("is_system") is_system!: boolean;

  // ✅ Foreign key
  @field("user_id") user_id!: string;

  // ✅ Optional relation
  @relation("users", "user_id") user;
}
