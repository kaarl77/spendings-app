import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import {HeadingText} from "../../common-components/HeadingText/HeadingText";
import {View} from "react-native";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {RecentTransactionList} from "../../common-components/RecentTransactionList/RecentTransactionList";
import {Transaction} from "../../custom-types/Transaction";
import {StringToDate} from "../../utils/date-utils";
import React, {useContext} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {Spacings} from "../../theming/spacings/Spacings";

interface Props {
  transactions: Transaction[];
}

export function RecentTransactions(props: Props) {
  const {transactions} = props;
  const {categories} = useContext(GlobalContext)

  const navigation = useNavigation<TabScreensNavigationProp<"Homepage">>();

  const Latest5Transactions: Transaction[] = get5LatestTransactions();

  return (
    <View>
      <HeadingText
        text={"Recent transactions"}
        onPress={() => {
          navigation.navigate("Transactions")
        }}
      />
      <Spacer height={Spacings["--1x"]}/>

      <RecentTransactionList transactions={Latest5Transactions}/>

    </View>
  );

  function get5LatestTransactions() {
    return (transactions.sort((a, b) => StringToDate(a.date).valueOf() < StringToDate(b.date).valueOf() ? 1 : -1).slice(0, 5));
  }
}