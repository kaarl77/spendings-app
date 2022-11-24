import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TimePeriod, TimePeriodSelector} from "../../common-components/TimePeriod/TimePeriodSelector";
import {TotalSpent} from "../../common-components/TotalSpent/TotalSpent";
import {Transaction} from "../../custom-types/Transaction";
import {useEffect, useState} from "react";
import {Text} from "../../vanguard/Text/Text";
import {StringToDate} from "../../utils/date-utils";
import {StyleSheet, View, ViewStyle} from "react-native";
import {Category} from "../../custom-types/Category";
import moment from "moment";
import {TransactionList} from "../../common-components/TransactionList/TransactionList";

const DEFAULT_NO_OF_SPENDINGS_TO_SHOW = 3

interface Props {
    transactions: Transaction[];
    styleProp?: ViewStyle;
    categories: Category[];
}

export function ReportSummary(props: Props) {
    const {transactions, styleProp, categories} = props;

    const [timePeriod, setTimePeriod] = useState(TimePeriod.week);
    const [filteredTransactions, setFilteredTransactions] = useState(transactions)
    const [totalSpent, setTotalSpent] = useState(0);

    useEffect(() => {
        setFilteredTransactions(getTransactionsFilteredByTimePeriod());
    }, [timePeriod])

    useEffect(() => {
        setTotalSpent(getTotalValueForTimePeriod());
    }, [filteredTransactions])

    const style = {
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

        {/* Extract this to a component called TopSpendings */}
        <Text bold={true}>Top spendings</Text>
        <Spacer height={16}/>

        <TransactionList
            transactions={getFirstNTransactionsByValue(DEFAULT_NO_OF_SPENDINGS_TO_SHOW)}
            categories={categories}
            totalSpent={totalSpent}/>
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

    function getFirstNTransactionsByValue(n: number) {
        const copyOfFilteredTransactions: Transaction[] = [...filteredTransactions];
        return copyOfFilteredTransactions.sort((a, b) => a.value < b.value ? 1 : -1).slice(0, n);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F4F4",
        padding: 16,
        borderRadius: 4,
    },
})
