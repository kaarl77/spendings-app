import {FlatList, View} from "react-native";
import {Screen} from "../../common-components/Screen/Screen";
import React, {useContext} from "react";
import {StringToDate} from "../../utils/date-utils";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {DayOfTransactions} from "../../common-components/DayOfTransactions/DayOfTransactions";
import {FAB} from "../../common-components/FAB/FAB";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";

export function Transactions() {
    const {transactions, categories} = useContext(GlobalContext);
    const sortedTransactionDatesArray = transactions.map((transaction) => transaction.date).sort((a, b) => StringToDate(a).valueOf() < StringToDate(b).valueOf() ? 1 : -1);
    const transactionDatesSet = new Set(sortedTransactionDatesArray);

    return (
        <Screen>
            <FlatList
                data={Array.from(transactionDatesSet)}
                renderItem={({item: date}) =>
                    <View>
                        <DayOfTransactions
                            transactions={getFilteredTransactionsByDate(date)}/>
                        <Spacer height={24}/>
                    </View>
                }
            />
            <FAB title={"+"}/>
        </Screen>
    )

    function getFilteredTransactionsByDate(date: string) {
        return transactions.filter((transaction) => transaction.date === date);
    }
}