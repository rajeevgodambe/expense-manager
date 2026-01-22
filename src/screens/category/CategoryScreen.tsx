import { Button, FlatList, Text, View } from "react-native"
import commonStyles from "../../styles/commonStyles"
import IconButton from "../../components/button/IconButton";
import ThemedText from "../../components/text/ThemedText";
import { typography } from "../../styles/typography";
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { useContext, useEffect, useState } from "react";
import Category from "../../database/models/category";
import CategoryItem from "../../components/items/category/CategoryItem";
import AddCategoryModal from "../../components/modals/category/AddCategoryModal";
import { addNewCategory } from "../../services/categoryService";
import { Empty } from "../../components/messageScreens/Empty";
import { AuthContext } from "../../navigation/AuthContext";
import { Q } from "@nozbe/watermelondb";


const CategoryScreen = () => {
    const database = useDatabase();
    const [categories, setCategories] = useState<Category[]>([]);
    const [addCategory, toggleAddCategory] = useState<boolean>(false);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if(user) {
            const query = database.collections
            .get<Category>('categories')
            .query(Q.where("user_id", user?.id));

            const subscription = query.observe().subscribe((result: Category[]) => {
                setCategories(result);
            });

            return () => subscription.unsubscribe();
        }
    }, [database, user]);

    const onAdd = (name: string, type: string) => {
        addNewCategory(name, type == "income", user?.id);
    }


    return (
        <View style={commonStyles.container}>
            <View style={[commonStyles.row, commonStyles.spaceBetween, commonStyles.alignCenter]}>
                <ThemedText style={[typography.heading]}>Categories</ThemedText>
                <IconButton onPress={() => {
                    toggleAddCategory(true);
                }} iconName="plus" />
            </View>
            <View style={{marginTop: 20, flex: 1}}>
                {
                    categories.length == 0 ?
                         <Empty message="No categories found" />
                    : <FlatList
                        data={categories}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <CategoryItem category={item} />}
                        style={{
                            marginBottom: 16
                        }}
                        showsVerticalScrollIndicator={false}
                    /> 
                }
            </View>
            {
                !!addCategory &&
                    <AddCategoryModal onAdd={onAdd} visible={addCategory} onClose={() => toggleAddCategory(false)} />
            }
        </View>
    )
}

export default CategoryScreen;