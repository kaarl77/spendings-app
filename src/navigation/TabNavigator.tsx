import {Homepage} from "../components/Homepage/Homepage";
import {Transactions} from "../components/Transactions/Transactions";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Image} from "react-native";
import React from "react";
import {useVanguardTheme} from "../colors/useVanguardTheme";
import {Transaction} from "../custom-types/Transaction";

export type TabStackParamList = {
  Homepage: undefined;
  Transactions: undefined;
  AddEditTransaction: { transaction: Transaction } | undefined;
};

export function TabNavigator() {
  const Tab = createBottomTabNavigator<TabStackParamList>();
  const {PalettePrimary, PaletteNeutral} = useVanguardTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: PalettePrimary["600"],
        tabBarInactiveTintColor: PaletteNeutral["600"],
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={() => ({
          tabBarIcon: ({focused}) => getHomepageIcon(focused)
        })}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={() => ({
          tabBarIcon: ({focused}) => getTransactionsIcon(focused)
        })}
      />
    </Tab.Navigator>)
}

function getHomepageIcon(focused: boolean) {
  if (focused) {
    return <Image
      style={{height: 20, width: 20}}
      source={require('../../assets/homepageHighlighted.png')}/>
  } else {
    return <Image
      style={{height: 20, width: 20}}
      source={require('../../assets/homepage.png')}/>
  }
}

function getTransactionsIcon(focused: boolean) {
  if (focused) {
    return <Image
      style={{height: 20, width: 20}}
      source={require('../../assets/transactionsHighlighted.png')}/>
  } else {
    return <Image
      style={{height: 20, width: 20}}
      source={require('../../assets/transactions.png')}/>
  }
}
