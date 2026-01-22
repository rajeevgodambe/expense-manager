
import { database } from "../database/database";
import Category from "../database/models/category";


const addNewCategory = async (name: string, isIncome: boolean, userId: any) => {
    await database.write(async () => {
        await database.get<Category>("categories").create((category) => {
            category.name = name;
            category.is_income = isIncome;
            category.is_system = false;
            category.user_id = userId
        });
    });
};


export {
    addNewCategory
}