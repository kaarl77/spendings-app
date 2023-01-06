import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TimePeriod, TimePeriodSelector} from "../../common-components/TimePeriod/TimePeriodSelector";
import {TotalSpent} from "../../common-components/TotalSpent/TotalSpent";
import React, {useEffect, useState} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";
import {TopSpendings} from "../TopSpendings/TopSpendings";
import {useVanguardTheme} from "../../theming/colors/useVanguardTheme";
import {Spacings} from "../../theming/spacings/Spacings";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux-stores/rootStore";
import {HomepageSlice} from "../Homepage/Homepage.slice";


interface Props {
  styleProp?: ViewStyle;
}

export function ReportSummary(props: Props) {
  const {styleProp} = props;
  const {transactions} = useSelector((state: RootState) => state.root);
  const {transactionsFilteredByTimePeriod} = useSelector((state: RootState) => state.homepage);
  const {getTransactionsFilteredByTimePeriod, getTotalSpentInTimePeriod} = HomepageSlice;
  const dispatch = useAppDispatch();
  const [timePeriod, setTimePeriod] = useState(TimePeriod.week);

  useEffect(() => {
    dispatch(getTransactionsFilteredByTimePeriod({timePeriod, transactions: transactions}));
  }, [timePeriod, transactions])

  useEffect(() => {
    dispatch(getTotalSpentInTimePeriod());
  }, [transactionsFilteredByTimePeriod])

  const {PaletteNeutral} = useVanguardTheme();
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
    />

    <Spacer height={Spacings["--3x"]}/>
    <TopSpendings/>
  </View>
}

const styles = StyleSheet.create({
  container: {
    padding: Spacings["--2x"],
    borderRadius: Spacings["--0.5x"],
  },
})
