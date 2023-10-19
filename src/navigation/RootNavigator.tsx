import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { TabNavigator } from "./TabNavigator";
import { AddEditTransaction } from "../components/AddEditTransaction/AddEditTransaction";
import { getCategories, getTransactions } from "../api/api";
import { RootSlice } from "../redux-stores/root.slice";
import { RootState, useAppDispatch } from "../redux-stores/rootStore";
import { useSelector } from "react-redux";
import * as Application from "expo-application";
import { LoadingState } from "../components/LoadingState/LoadingState";

const Root = createStackNavigator();

export function RootNavigator() {
  const dispatch = useAppDispatch();

  const { setTransactions, setCategories, resetState } = RootSlice;
  const { categories } = useSelector((state: RootState) => state.root);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    console.log("This happened on launch");
    dispatch(resetState());
    getCategories().then((res) => {
      dispatch(setCategories(res));
    });
    getTransactions()
      .then((res) => {
        dispatch(setTransactions([...res]));

        setIsAppReady(true);
      })
      .then(() => {});
  }, [dispatch]);

  if (!isAppReady) {
    return <LoadingState />;
  }

  return (
    <Root.Navigator>
      <Root.Screen
        name={"TabNavigator"}
        component={TabNavigator}
        options={{ headerShown: false }}
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
  );
}
