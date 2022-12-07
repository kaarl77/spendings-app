import {Text} from "../../vanguard/Text/Text";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TransactionList} from "../../common-components/TransactionList/TransactionList";
import {Transaction} from "../../custom-types/Transaction";
import {useContext} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";

const DEFAULT_NO_OF_SPENDINGS_TO_SHOW = 3

interface Props {
  totalSpent: number;
  filteredTransactions: Transaction[];
}

export function TopSpendings(props: Props) {
  const {totalSpent, filteredTransactions} = props;
  const {categories} = useContext(GlobalContext);

  return (
    <>
      <Text bold={true}>Top spendings</Text>
      <Spacer height={16}/>

      <TransactionList
        transactions={getFirstNTransactionsByValue(DEFAULT_NO_OF_SPENDINGS_TO_SHOW)}
        totalSpent={totalSpent}/>
    </>
  )

  function getFirstNTransactionsByValue(n: number) {
    const copyOfFilteredTransactions: Transaction[] = [...filteredTransactions];
    return copyOfFilteredTransactions.sort((a, b) => a.value < b.value ? 1 : -1).slice(0, n);
  }
}