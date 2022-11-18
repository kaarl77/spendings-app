import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TimePeriod, TimePeriodSelector} from "../../common-components/TimePeriod/TimePeriodSelector";
import {TotalSpent} from "../../common-components/TotalSpent/TotalSpent";
import {TransactionCategory} from "../TransactionCategory/TransactionCategory";
import {Transaction} from "../../custom-types/Transaction";
import {useEffect, useState} from "react";
import {Text} from "../../vanguard/Text/Text";
import {DateToString, StringToDate} from "../../utils/date-utils";
import {Transactions} from "../Transactions/Transactions";
import {Homepage} from "../Homepage/Homepage";
import {StyleSheet, View, ViewStyle} from "react-native";
import {Category} from "../../custom-types/Category";
import moment from "moment";
import {TransactionList} from "../../common-components/TransactionList/TransactionList";

interface Props {
    timePeriod: TimePeriod;
    onPeriodChange: (newPeriodTime: TimePeriod) => void;
    transactions: Transaction[];
    styleProp?: ViewStyle;
    categories: Category[];
}

export function ReportSummary(props: Props) {
    const {timePeriod, onPeriodChange, transactions, styleProp, categories} = props;

    const style = {
        ...styles.container,
        ...styleProp,
    }

    const [filteredTransactions, setFilteredTransactions] = useState(transactions)
    const [totalSpent, setTotalSpent] = useState(0);

    useEffect(() => {
        setFilteredTransactions(getTransactionsFilteredByTimePeriod());
    }, [timePeriod])

    useEffect(() => {
        setTotalSpent(getTotalValueForTimePeriod());
    }, [filteredTransactions])

    return <View style={style}>
        <Spacer height={16}/>
        <TimePeriodSelector
            timePeriod={timePeriod}
            onTimePeriodChange={onPeriodChange}/>

        <Spacer height={24}/>
        <TotalSpent
            timePeriod={timePeriod}
            totalSpent={totalSpent}
        />

        <Spacer height={24}/>

        <Text bold={true}>Top spendings</Text>
        <Spacer height={16}/>

        <TransactionList
            transactions={getFirst3TransactionsByValue()}
            categories={categories}
            totalSpent={totalSpent}/>
    </View>


    function getTransactionsFilteredByTimePeriod() {
        const currentDate = moment();

        const filterByTimePeriod = (transaction: Transaction) => {
            if (timePeriod === TimePeriod.week) {
                return currentDate.week() === StringToDate(transaction.date).week();
            } else {
                return currentDate.month() === StringToDate(transaction.date).month();
            }
        }
        return transactions.filter(filterByTimePeriod);
    }

    function getTotalValueForTimePeriod() {
        let x = 0;
        for (const element of filteredTransactions) {
            x += element.value;
        }
        return Number.parseFloat(Number.parseFloat(x.toString()).toFixed(2));
    }

    function getFirst3TransactionsByValue() {
        const copyOfFilteredTransactions: Transaction[] = [...filteredTransactions];
        return copyOfFilteredTransactions.sort((a, b) => a.value < b.value ? 1 : -1).slice(0, 3);
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F4F4",
        padding: 16,
        borderRadius: 4,
    },
})
