import {Homepage} from "../components/Homepage/Homepage";
import {Transactions} from "../components/Transactions/Transactions";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Image} from "react-native";
import React from "react";
import {useVanguardTheme} from "../colors/useVanguardTheme";
import {Transaction} from "../custom-types/Transaction";
import {AddEditTransaction} from "../components/AddEditTransaction/AddEditTransaction";

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
      <Tab.Screen
        name={"AddEditTransaction"}
        component={AddEditTransaction}
        options={{
          tabBarButton: (props) => null, //TODO find alternative (stacked navigators)
          headerShown: true,
        }}
      />
    </Tab.Navigator>)

}