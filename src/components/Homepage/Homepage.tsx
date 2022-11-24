import {Screen} from "../../common-components/Screen/Screen";
import {TimePeriod} from "../../common-components/TimePeriod/TimePeriodSelector";
import React, {useContext, useEffect, useState} from "react";
import {ReportSummary} from "../ReportSummary/ReportSummary";
import {ScrollView,} from "react-native";
import {Text} from "../../vanguard/Text/Text";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {RecentTransactions} from "../RecentTransactions/RecentTransactions";
import {getBoth} from "../../api/api";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {FAB} from "../../common-components/FAB/FAB";

export function Homepage() {
    const [timePeriod, setTimePeriod] = useState(TimePeriod.week);

    useEffect(() => {
        getBoth()
            .then((value) => {
                setTransactions(value.transactions);
                setCategories(value.categories);
            })
    }, [])

    const {transactions, categories, setTransactions, setCategories} = useContext(GlobalContext);

    if(transactions.length === 0 || categories.length === 0)
        return(
            <Screen>
                <Text bold={true}>
                    Transactions and categories loading...
                </Text>
            </Screen>
        )

    return (
        <Screen>
            <ScrollView>
                <Text bold={true}>Reports summary</Text>
                <Spacer height={8}/>

                <ReportSummary
                    timePeriod={timePeriod}
                    onPeriodChange={onPeriodChange}
                    transactions={transactions}
                    categories={categories}
                />
                <Spacer height={32}/>

                <RecentTransactions transactions={transactions} categories={categories}/>
            </ScrollView>
            <FAB title={"+"}/>
        </Screen>
    )
    function onPeriodChange(timePeriod: TimePeriod) {
        setTimePeriod(timePeriod);
    }
}

