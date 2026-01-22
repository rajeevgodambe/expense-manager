import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "users",
      columns: [
        { name: "name", type: "string" },
        { name: "email", type: "string", isIndexed: true },
        { name: "password", type: "string" },
      ],
    }),
    tableSchema({
      name: "categories",
      columns: [
        { name: "name", type: "string" },
        { name: "is_income", type: "boolean" },
        { name: "is_system", type: "boolean" }, // To make sure no one can delete these categories
        { name: "user_id", type: "string", isIndexed: true },
      ],
    }),
    tableSchema({
      name: "expenses",
      columns: [
        { name: "user_id", type: "string", isIndexed: true },
        { name: "category_id", type: "string", isIndexed: true },
        { name: "amount", type: "number" },
        { name: "note", type: "string", isOptional: true },
        { name: "date", type: "number" }, // timestamp
      ],
    }),
  ],
});
