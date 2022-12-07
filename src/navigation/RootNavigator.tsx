import {createStackNavigator} from '@react-navigation/stack';
import React from "react";
import {TabNavigator} from "./TabNavigator";
import {AddEditTransaction} from "../components/AddEditTransaction/AddEditTransaction";
import {Button} from "../vanguard/Button/Button";
import {useVanguardTheme} from "../colors/useVanguardTheme";
import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "./NavigationTypes";

const Root = createStackNavigator();

export function RootNavigator() {
  const theme = useVanguardTheme();
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
          headerRight: () => (
            <Button title={"Edit"}/>
          ),
          headerLeft: () => (
            <Button title={"< Back"}/>
          )
        }}
      />
    </Root.Navigator>
  )
}