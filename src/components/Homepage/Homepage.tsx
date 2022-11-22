import {Screen} from "../../common-components/Screen/Screen";
import {TimePeriod} from "../../common-components/TimePeriod/TimePeriodSelector";
import React, {useContext, useEffect, useState} from "react";
import {ReportSummary} from "../ReportSummary/ReportSummary";
import {Transaction} from "../../custom-types/Transaction";
import {Category} from "../../custom-types/Category";
import {ScrollView, StyleSheet} from "react-native";
import {Text} from "../../vanguard/Text/Text";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {HeadingText} from "../../common-components/HeadingText/HeadingText";
import {TransactionList} from "../../common-components/TransactionList/TransactionList";
import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import {RecentTransactions} from "../RecentTransactions/RecentTransactions";
import {getBoth, getCategories, getTransactions} from "../../api/api";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";

//import {categoriesContext, transactionsContext} from "../../navigation/TabNavigator";


export function Homepage() {
    const [timePeriod, setTimePeriod] = useState(TimePeriod.week);

    // useEffect(() => {
    //     console.log(timePeriod);
    // },[timePeriod]);
    //

    useEffect(() => {
        getBoth()
            .then((value) => {
                setTransactions(value.transactions);
                setCategories(value.categories)
            })
    }, [])

    const {transactions, categories, setTransactions, setCategories} = useContext(GlobalContext);
    
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
        </Screen>
    )

    function onPeriodChange(timePeriod: TimePeriod) {
        setTimePeriod(timePeriod);
    }
}

