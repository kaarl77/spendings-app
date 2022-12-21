import {FlatList, StyleSheet, View} from "react-native";
import {Screen} from "../../common-components/Screen/Screen";
import React, {useEffect} from "react";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {DayOfTransactions} from "../../common-components/DayOfTransactions/DayOfTransactions";
import {FAB} from "../../common-components/FAB/FAB";
import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import {Spacings} from "../../theming/spacings/Spacings";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux-stores/rootStore";
import {TransactionsSlice} from "./Transaction.slice";

export function Transactions() {
  const {transactions} = useSelector((state: RootState) => state.root);
  const navigation = useNavigation<TabScreensNavigationProp<"Transactions">>();

  const dispatch = useAppDispatch();
  const {sortedTransactionDatesArray} = useSelector((state: RootState)=>state.transactions);
  const {getSortedTransactionDates} = TransactionsSlice;

  useEffect(()=>{
      dispatch(getSortedTransactionDates(transactions));
    }
    , [])

  const transactionDatesSet = new Set(sortedTransactionDatesArray);

  return (
    <Screen styleProp={styles.container}>
      <FlatList
        data={Array.from(transactionDatesSet)}
        renderItem={({item: date}) =>
          <View>
            <DayOfTransactions
              transactions={getFilteredTransactionsByDate(date)}/>
            <Spacer height={Spacings["--3x"]}/>
          </View>
        }
      />
      <FAB title={"+"} onPress={() => navigation.navigate("AddEditTransaction")}/>
    </Screen>
  )

  function getFilteredTransactionsByDate(date: string) {
    return transactions.filter((transaction) => transaction.date === date);
  }
}

const styles = StyleSheet.create({
  container: {},
})