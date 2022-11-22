import {NavigationContainer} from '@react-navigation/native';
import {Homepage} from "../components/Homepage/Homepage";
import {Transactions} from "../components/Transactions/Transactions";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Image} from "react-native";
import {Transaction} from "../custom-types/Transaction";
import {Category} from "../custom-types/Category";
import React from "react";

export type TabStackParamList = {
    Homepage: undefined;
    Transactions: { transactions: Transaction[] };
    AddEditTransaction: undefined;
};

export function TabNavigator() {
    const Tab = createBottomTabNavigator<TabStackParamList>();
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#4940CB",
                    tabBarInactiveTintColor: "#6A6A6A"
                }}>
                <Tab.Screen
                    name="Homepage"
                    component={Homepage}
                    options={{headerShown: false}}
                    />
                <Tab.Screen
                    name="Transactions"
                    component={Transactions}
                    options={{headerShown: false}}/>
            </Tab.Navigator>
        </NavigationContainer>)
}