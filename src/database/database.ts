import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { schema } from "./schema";
import User from "./models/user";
import Category from "./models/category";
import Expense from "./models/expense";
import { Q } from "@nozbe/watermelondb";

const adapter = new SQLiteAdapter({
  schema,
});

const database = new Database({
  adapter,
  modelClasses: [User, Category, Expense],
});


const addDefaultCategories = async (user: { id: string }) => {
  const categoryCollection = database.collections.get("categories");

  const count = await categoryCollection
    .query(Q.where("user_id", user.id))
    .fetchCount();

  if (count > 0) return;

  const defaultCategories = [
    { name: "Food", is_income: false },
    { name: "Rent", is_income: false },
    { name: "Transport", is_income: false },
    { name: "Shopping", is_income: false },
    { name: "Utilities", is_income: false },
    // { name: "Salary", is_income: true },
  ];

  await database.write(async () => {
    await Promise.all(
      defaultCategories.map(cat =>
        categoryCollection.create(c => {
          c.name = cat.name;
          c.is_income = cat.is_income;
          c.is_system = true;
          c.user_id = user.id;
        })
      )
    );
  });
};


export {
  database,
  addDefaultCategories,
}