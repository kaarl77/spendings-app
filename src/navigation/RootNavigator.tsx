import {createStackNavigator} from '@react-navigation/stack';
import React from "react";
import {TabNavigator} from "./TabNavigator";
import {AddEditTransaction} from "../components/AddEditTransaction/AddEditTransaction";
import {Button} from "../vanguard/Button/Button";
import {useVanguardTheme} from "../theming/colors/useVanguardTheme";

const Root = createStackNavigator();

export function RootNavigator() {
  return (
    <Root.Navigator>
      <Root.Screen
        name={"TabNavigator"}
        component={TabNavigator}
        options={{headerShown: false}}
      />

      <Root.Screen
        name={"AddEditTransaction"}
        component={AddEditTransaction}
        options={{
          headerTitle: "Add or Edit Transaction",
          headerBackTitle: "Back",
        }}
      />
    </Root.Navigator>
  )
}