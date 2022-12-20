import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import {HeadingText} from "../../common-components/HeadingText/HeadingText";
import {View} from "react-native";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {RecentTransactionList} from "../../common-components/RecentTransactionList/RecentTransactionList";
import React from "react";
import {Spacings} from "../../theming/spacings/Spacings";

export function RecentTransactions() {
  const navigation = useNavigation<TabScreensNavigationProp<"Homepage">>();


  return (
    <View>
      <HeadingText
        text={"Recent transactions"}
        onPress={() => {
          navigation.navigate("Transactions")
        }}
      />
      <Spacer height={Spacings["--1x"]}/>

      <RecentTransactionList/>

    </View>
  );
  // function get5LatestTransactions() {
  //   return (transactions.sort((a, b) => StringToDate(a.date).valueOf() < StringToDate(b.date).valueOf() ? 1 : -1).slice(0, 5));
  // }
}