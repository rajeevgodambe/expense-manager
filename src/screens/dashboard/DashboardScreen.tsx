import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { AuthContext } from "../../navigation/AuthContext";
import ThemedText from "../../components/text/ThemedText";
import Card from "../../components/card/Card";
import { styles } from "./styles";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import Expense from "../../database/models/expense";
import Category from "../../database/models/category";
import { Q } from "@nozbe/watermelondb";
import { Empty } from "../../components/messageScreens/Empty";
import ExpenseItem from "../../components/items/expense/ExpenseItem";
import CategoryBarCard from "../../components/card/CategoryBarCard";


const dummyTransactions = [
  { id: "1", title: "Food", amount: 200, date: "Today" },
  { id: "2", title: "Rent", amount: 1000, date: "Yesterday" },
  { id: "3", title: "Shopping", amount: 500, date: "2 days ago" },
  { id: "4", title: "Transport", amount: 150, date: "Last week" },
];

const DashboardScreen = () => {
  const { user, signOut } = useContext(AuthContext);
  const database = useDatabase();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadCategories = async () => {
      const categories = await database.collections
        .get<Category>("categories")
        .query(Q.where("user_id", user?.id))
        .fetch();

      const map: Record<string, string> = {};
      categories.forEach(cat => {
        map[cat.id] = cat.name;
      });

      setCategoryMap(map);
    };

    loadCategories();
  }, [database]);

  useEffect(() => {
    const query = database.collections
      .get<Expense>("expenses")
      .query(
        Q.where("user_id", user?.id),
        Q.take(4),
        Q.sortBy("date", "desc")
      );

    const subscription = query.observe().subscribe((result: Expense[]) => {
      setExpenses(result);

    });

    return () => subscription.unsubscribe();
  }, [database, categoryMap]);

  return (
    // <ScrollView
    //   style={styles.container}
    //   contentContainerStyle={styles.contentContainer}
    //   showsVerticalScrollIndicator={false}
    // ></ScrollView>
    <ScrollView 
      style={styles.container}
      //  contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.topBar}>
        <View>
          <ThemedText style={styles.welcomeText}>
            Welcome {user?.name}
          </ThemedText>
          <ThemedText style={styles.subText}>Have a nice day!</ThemedText>
        </View>

        <TouchableOpacity onPress={signOut} style={styles.logoutBtn}>
          <MaterialDesignIcons name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      </View>


      <View style={styles.cardRow}>
        <View style={styles.cardWrapper}>
          <Card style={{ flexDirection: 'column', }}>
            <ThemedText style={styles.cardTitle}>Total Expenses</ThemedText>
            <ThemedText style={styles.cardValue}>₹ 12,450</ThemedText>
          </Card>
        </View>
      </View>

      <CategoryBarCard />


      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>Recent Transactions</ThemedText>
        <ThemedText style={styles.sectionSub}>Latest 4</ThemedText>
      </View>

      {
        expenses.length == 0 ?
          <Empty message="No expenses found" />
          : <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExpenseItem categoryName={categoryMap[item.categoryId]} onPress={() => {}} expense={item} />}
            style={{
              marginBottom: 16
            }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            nestedScrollEnabled={true}
          />
      }

    </ScrollView>
  );
};

export default DashboardScreen;

