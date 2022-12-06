import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TimePeriod, TimePeriodSelector} from "../../common-components/TimePeriod/TimePeriodSelector";
import {TotalSpent} from "../../common-components/TotalSpent/TotalSpent";
import {Transaction} from "../../custom-types/Transaction";
import {useContext, useEffect, useState} from "react";
import {StringToDate} from "../../utils/date-utils";
import {StyleSheet, View, ViewStyle} from "react-native";
import moment from "moment";
import {TopSpendings} from "../TopSpendings/TopSpendings";
import {useVanguardTheme} from "../../colors/useVanguardTheme";
import {useRoute} from "@react-navigation/native";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";

const DEFAULT_NO_OF_SPENDINGS_TO_SHOW = 3

interface Props {
    transactions: Transaction[];
    styleProp?: ViewStyle;
}

export function ReportSummary(props: Props) {
    const {transactions, styleProp} = props;
    const {transactions: globalTransactions} = useContext(GlobalContext);

    const [timePeriod, setTimePeriod] = useState(TimePeriod.week);
    const [filteredTransactions, setFilteredTransactions] = useState(transactions)
    const [totalSpent, setTotalSpent] = useState(0);
    const {PaletteNeutral} = useVanguardTheme();

    useEffect(() => {
        setFilteredTransactions(getTransactionsFilteredByTimePeriod());
    }, [timePeriod, globalTransactions])

    useEffect(() => {
        setTotalSpent(getTotalValueForTimePeriod());
    }, [filteredTransactions])

    useEffect(()=>{
        console.log("alt hey")},[transactions])

    const style = {
        backgroundColor: PaletteNeutral["200"],
        ...styles.container,
        ...styleProp,
    }

    return <View style={style}>
        <TimePeriodSelector
            timePeriod={timePeriod}
            onTimePeriodChange={setTimePeriod}/>

        <Spacer height={24}/>
        <TotalSpent
            timePeriod={timePeriod}
            totalSpent={totalSpent}
        />

        <Spacer height={24}/>

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
