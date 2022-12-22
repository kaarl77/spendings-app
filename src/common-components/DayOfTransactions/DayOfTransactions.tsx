import {StyleSheet, View} from "react-native";
import {DayHeader} from "../DayHeader/DayHeader";
import {ListOfTransactionsByDay} from "../../components/ListOfTransactionsByDay/ListOfTransactionsByDay";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {useVanguardTheme} from "../../theming/colors/useVanguardTheme";
import {Spacings} from "../../theming/spacings/Spacings";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux-stores/rootStore";

interface Props {
  i: number;
}

export function DayOfTransactions(props: Props) {
  const {i} = props;
  const {filteredTransactionsByDate: transactions} = useSelector((state: RootState) => state.root);

  const {PaletteNeutral} = useVanguardTheme();

  const containerStyle = {
    backgroundColor: PaletteNeutral["200"],
    ...styles.container,
  };

  //sanity check
  if (!transactions || transactions.length === 0) {
    return null;
  }

  return (
    <View style={containerStyle}>
      {<DayHeader
        dateString={transactions[i][0].date}
        value={getValueByDate(transactions[i][0].date)}
      />}
      <Spacer height={Spacings["--2x"]}/>
      <ListOfTransactionsByDay
        transactions={transactions[i]}/>
    </View>
  )

  function getValueByDate(date: string) {
    const filteredTransactionsByDate = transactions[i].filter((transaction) => transaction.date === date);
    return filteredTransactionsByDate.reduce(
      (acc, cur) => acc + cur.value,
      0
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 4,
  },
})