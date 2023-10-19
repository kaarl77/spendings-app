import { Screen } from "../../common-components/Screen/Screen";
import React, { useEffect } from "react";
import { ReportSummary } from "../ReportSummary/ReportSummary";
import { RefreshControl, ScrollView } from "react-native";
import { Text } from "../../vanguard/Text/Text";
import { Spacer } from "../../vanguard/Spacer/Spacer";
import { RecentTransactions } from "../RecentTransactions/RecentTransactions";
import { FAB } from "../../common-components/FAB/FAB";
import { EmptyState } from "../EmptyState/EmptyState";
import { useNavigation } from "@react-navigation/native";
import { TabScreensNavigationProp } from "../../navigation/NavigationTypes";
import { Spacings } from "../../theming/spacings/Spacings";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux-stores/rootStore";
import { RootSlice } from "../../redux-stores/root.slice";
import { HomepageSlice } from "./Homepage.slice";
import { Button } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { getCategories, getTransactions } from "../../api/api";

export function Homepage() {
  const navigation = useNavigation<TabScreensNavigationProp<"Homepage">>();
  const { transactions, categories } = useSelector(
    (state: RootState) => state.root
  );

  const dispatch = useAppDispatch();
  const { getLatest5Transactions } = HomepageSlice;
  const { setFilteredTransactionsByDate, setUniqueDates } = RootSlice;
  const { setTransactions, setCategories, resetState } = RootSlice;

  function onRefresh() {
    dispatch(resetState());
    getCategories().then((res) => {
      console.log("categ", res);
      dispatch(setCategories(res));
    });
    getTransactions()
      .then((res) => {
        // console.log("tran", res);
        dispatch(setTransactions([...res]));
      })
      .then(() => {});
    console.log("cat from state", categories);
  }

  useEffect(() => {
    dispatch(getLatest5Transactions(transactions));
    dispatch(setUniqueDates());
    dispatch(setFilteredTransactionsByDate());
  }, [transactions]);

  if (transactions.length === 0) {
    return <EmptyState />;
  }

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            style={{ opacity: 0 }}
          />
        }
      >
        <Text bold={true}>Reports summary</Text>
        <Spacer height={Spacings["--1x"]} />

        <ReportSummary />
        <Spacer height={Spacings["--3x"]} />

        <RecentTransactions />
      </ScrollView>
      <FAB
        title={"+"}
        onPress={() => navigation.navigate("AddEditTransaction")}
      />
    </Screen>
  );
}
