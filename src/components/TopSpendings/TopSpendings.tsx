import {Text} from "../../vanguard/Text/Text";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TransactionList} from "../../common-components/TransactionList/TransactionList";
import {Transaction} from "../../custom-types/Transaction";
import React from "react";
import {Spacings} from "../../theming/spacings/Spacings";
import {useSelector} from "react-redux";
import {RootState} from "../../redux-stores/rootStore";

const DEFAULT_NO_OF_SPENDINGS_TO_SHOW = 3

export function TopSpendings() {
  const {transactionsFilteredByTimePeriod, totalSpentInTimePeriod} = useSelector((state: RootState) => state.homepage);

  return (
    <>
      <Text bold={true}>Top spendings</Text>
      <Spacer height={Spacings["--2x"]}/>

      <TransactionList
        transactions={getFirstNTransactionsByValue(DEFAULT_NO_OF_SPENDINGS_TO_SHOW)}
        totalSpent={totalSpentInTimePeriod}/>
    </>
  )

  function getFirstNTransactionsByValue(n: number) {
    const copyOfFilteredTransactions: Transaction[] = [...transactionsFilteredByTimePeriod];
    return copyOfFilteredTransactions.sort((a, b) => a.value < b.value ? 1 : -1).slice(0, n);
  }
}