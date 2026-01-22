import React from 'react';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import CategoryScreen from '../screens/category/CategoryScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ExpenseScreen } from '../screens/expense/ExpenseScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "view-dashboard";

            switch (route.name) {
              case 'Dashboard':
                iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
                break;

              case 'Transactions':
                iconName = focused ? 'list-box' : 'list-box-outline';
                break;

              case 'Categories':
                iconName = focused ? 'shape' : 'shape-outline';
                break;

              case 'More':
                iconName = focused ? 'dots-horizontal' : 'dots-horizontal-circle-outline';
                break;
            }

            return (
              <MaterialDesignIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Transactions" component={ExpenseScreen} />
        <Tab.Screen name="Categories" component={CategoryScreen} />
        {/* <Tab.Screen name="More" component={DashboardScreen} /> */}
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={StackNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default AppNavigator;
