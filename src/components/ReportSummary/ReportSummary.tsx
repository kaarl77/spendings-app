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
import {View, ViewStyle} from "react-native";
import {Category} from "../../custom-types/Category";


interface Props {
    timePeriod: TimePeriod;
    onPeriodChange: (newPeriodTime: TimePeriod) => void;
    transactions: Transaction[];
    styleProp?: ViewStyle;
    nrOfCategories: number;
    categories: Category[];
}

export function ReportSummary(props: Props) {
    const {timePeriod, onPeriodChange, transactions, styleProp,nrOfCategories, categories} = props;

    const style = {
        ...styleProp,
    }

    const [filteredTransactions, setFilteredTransactions] = useState(transactions)
    const [totalSpent, setTotalSpent] = useState(0);

    const totalOnPeriodChange = (resetValue: number) => {
        setTotalSpent(resetValue);
    }
    useEffect(() => {
        totalOnPeriodChange(0);
        const currentDate = new Date();
        const filterByTimePeriod = (transaction: Transaction) => {
            if (timePeriod === TimePeriod.week) {
                const timeDifference = currentDate.getTime() - StringToDate(transaction.date).getTime();
                return ((timeDifference / (1000 * 60 * 60 * 24)) <= 7)
            } else {
                return ((currentDate.getMonth() === StringToDate(transaction.date).getMonth()));
            }
        }
        setFilteredTransactions(transactions.filter(filterByTimePeriod));

    }, [timePeriod])

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

        <TransactionCategory
            timePeriod={timePeriod}
            transactions={filteredTransactions}
            totalSpent={totalSpent}
            totalOnPeriodChange={totalOnPeriodChange}
            nrOfCategories={nrOfCategories}
            categories={categories}
        />
    </View>
}