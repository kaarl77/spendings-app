import {DarkTheme, DefaultTheme, NavigationContainer, useTheme} from '@react-navigation/native';
import {Homepage} from "../components/Homepage/Homepage";
import {Transactions} from "../components/Transactions/Transactions";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Image, useColorScheme} from "react-native";
import {Transaction} from "../custom-types/Transaction";
import React from "react";
import {useVanguardTheme} from "../colors/useVanguardTheme";

export type TabStackParamList = {
    Homepage: undefined;
    Transactions: { transactions: Transaction[] };
    AddEditTransaction: undefined;
};

export function TabNavigator() {
    const Tab = createBottomTabNavigator<TabStackParamList>();
    const {PalettePrimary,PaletteNeutral} = useVanguardTheme();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color}) => {
                        if (route.name === "Homepage") {
                            if (focused) {
                                return <Image
                                    style={{height: 20, width: 20}}
                                    source={require('../../assets/homepageHighlighted.png')}/>
                            } else {
                                return <Image
                                    style={{height: 20, width: 20}}
                                    source={require('../../assets/homepage.png')}/>
                            }
                        } else {
                            if (focused) {
                                return <Image
                                    style={{height: 21, width: 20}}
                                    source={require('../../assets/transactionsHighlighted.png')}/>
                            } else {
                                return <Image
                                    style={{height: 21, width: 20}}
                                    source={require('../../assets/transactions.png')}/>
                            }
                        }
                    },
                    tabBarActiveTintColor: PalettePrimary["600"],
                    tabBarInactiveTintColor: PaletteNeutral["600"],
                    headerShown: false,

                })}>

                <Tab.Screen
                    name="Homepage"
                    component={Homepage}
                />
                <Tab.Screen
                    name="Transactions"
                    component={Transactions}
                />
            </Tab.Navigator>
        </NavigationContainer>)
}