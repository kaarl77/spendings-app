import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TimePeriod, TimePeriodSelector} from "../../common-components/TimePeriod/TimePeriodSelector";
import {TotalSpent} from "../../common-components/TotalSpent/TotalSpent";
import {TransactionCategory} from "../TransactionCategory/TransactionCategory";
import {Transaction} from "../../custom-types/Transaction";
import {useEffect, useState} from "react";
import {Text} from "../../vanguard/Text/Text";
import {DateToString, StringToDate} from "../../utils/date-utils";
import {Transactions} from "../Transactions/Transactions";

interface Props {
    timePeriod: TimePeriod;
    onPeriodChange: (newPeriodTime: TimePeriod) => void;
    transactions: Transaction[];
}

export function ReportSummary(props: Props) {
    const {timePeriod, onPeriodChange, transactions} = props;

    const emptyTransaction:Transaction[] = [];


    const [filteredTransactions, setFilteredTransactions] = useState(emptyTransaction)
    const copyOfTransactions: Transaction[] = transactions;
    const [totalSpent, setTotalSpent] = useState(0);

    const totalOnPeriodChange = (resetValue: number) => {
        setTotalSpent(resetValue);
    }

    useEffect(() => {
            totalOnPeriodChange(0);
            setFilteredTransactions(copyOfTransactions);
            const currentDate = new Date();
            const filterByTimePeriod = (transaction: Transaction) => {
                if (timePeriod === TimePeriod.week) {
                    const timeDifference = currentDate.getTime() - StringToDate(transaction.date).getTime();
                    return ((timeDifference / (1000 * 60 * 60 * 24)) <= 7)
                } else {
                    return ((currentDate.getMonth() === StringToDate(transaction.date).getMonth()));
                }
            }

            //const filteredTransactions:Transaction[]= transactions.filter(filterByTimePeriod);
            setFilteredTransactions(transactions.filter(filterByTimePeriod));


            let x = 0;
             for (let i = 0; i < filteredTransactions.length; i++) {
                 x += filteredTransactions[i].value;
             }

            totalOnPeriodChange(Number.parseFloat(Number.parseFloat(x.toString()).toFixed(2)));
        }
        , [timePeriod])
    return <>
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
        />
    </>
}