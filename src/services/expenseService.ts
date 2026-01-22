
import { database } from "../database/database";
import Expense from "../database/models/expense";


const addNewExpense = async (user: { id: string }, data: any) => {
    await database.write(async () => {
        await database.get<Expense>("expenses").create((expense) => {
            expense.amount = Number(data?.amount);
            expense.note = data?.description;
            expense.date = data?.date ? data?.date?.getTime() : Date.now();
            expense.categoryId = data.category.id;
            expense.userId = user.id;
        });
    });
};

const updateExpense = async (
    user: { id: string },
    expenseDetails: Expense,
    data: any
) => {
    const expense = await database.collections
    .get<Expense>("expenses")
    .find(expenseDetails.id);
    await database.write(async () => {
        await expense.update(e => {
            e.amount = Number(data.amount);
            e.note = data.description;
            e.date = data.date ? data.date.getTime() : Date.now();
            e.categoryId = data.category.id;
            e.userId = user.id;
        });
    });

};



export {
    addNewExpense,
    updateExpense
}