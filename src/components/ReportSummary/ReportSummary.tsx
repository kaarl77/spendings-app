import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TimePeriod, TimePeriodSelector} from "../../common-components/TimePeriod/TimePeriodSelector";
import {TotalSpent} from "../../common-components/TotalSpent/TotalSpent";
import {Transaction} from "../../custom-types/Transaction";
import React, {useEffect, useState} from "react";
import {StringToDate} from "../../utils/date-utils";
import {StyleSheet, View, ViewStyle} from "react-native";
import moment from "moment";
import {TopSpendings} from "../TopSpendings/TopSpendings";
import {useVanguardTheme} from "../../theming/colors/useVanguardTheme";
import {Spacings} from "../../theming/spacings/Spacings";
import {useSelector} from "react-redux";
import {RootState} from "../../redux-stores/rootStore";


interface Props {
  styleProp?: ViewStyle;
}

export function ReportSummary(props: Props) {
  const {styleProp} = props;

  const {transactions} = useSelector((state: RootState)=>state.root)

  const [timePeriod, setTimePeriod] = useState(TimePeriod.week);
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
  const [totalSpent, setTotalSpent] = useState(0);
  const {PaletteNeutral} = useVanguardTheme();

  useEffect(() => {
    setFilteredTransactions(getTransactionsFilteredByTimePeriod());
  }, [timePeriod, transactions])

  useEffect(() => {
    setTotalSpent(getTotalValueForTimePeriod());
  }, [filteredTransactions])

  const style = {
    backgroundColor: PaletteNeutral["200"],
    ...styles.container,
    ...styleProp,
  }

  return <View style={style}>
    <TimePeriodSelector
      timePeriod={timePeriod}
      onTimePeriodChange={setTimePeriod}/>

    <Spacer height={Spacings["--3x"]}/>
    <TotalSpent
      timePeriod={timePeriod}
      totalSpent={totalSpent}
    />

    <Spacer height={Spacings["--3x"]}/>

    <TopSpendings
      totalSpent={totalSpent}
      filteredTransactions={filteredTransactions}/>
  </View>


  function getTransactionsFilteredByTimePeriod() {
    switch (timePeriod) {
      case TimePeriod.month:
        return getTransactionsForThisMonth()
      case TimePeriod.week:
        return getTransactionsForThisWeek()
    }
  }

  function getTransactionsForThisMonth() {
    return transactions.filter((transaction) => moment().month() === StringToDate(transaction.date).month())
  }

  function getTransactionsForThisWeek() {
    return transactions.filter((transaction) => moment().week() === StringToDate(transaction.date).week())
  }

  function getTotalValueForTimePeriod() {
    let x = 0;
    for (const element of filteredTransactions) {
      x += element.value;
    }
    return Number.parseFloat(Number.parseFloat(x.toString()).toFixed(2));
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 4,
  },
})
