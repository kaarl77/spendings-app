import {FlatList, ScrollView, Text, View} from "react-native";
import {Screen} from "../../common-components/Screen/Screen";
import {useRoute} from "@react-navigation/native";
import {TabScreensRouteProp} from "../../navigation/NavigationTypes";
import {useContext} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {StringToDate} from "../../utils/date-utils";
import {Transaction} from "../../custom-types/Transaction";
import {DayHeader} from "../../common-components/DayHeader/DayHeader";
import moment from "moment";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {DayOfTransactions} from "../../common-components/DayOfTransactions/DayOfTransactions";
import {ListOfTransactionsByDay} from "../ListOfTransactionsByDay/ListOfTransactionsByDay";

export function Transactions() {
    const {transactions, categories} = useContext(GlobalContext);
    //flatlist of flatlists
    const sortedTransactionDatesArray = transactions.map((transaction) => transaction.date).sort((a, b) => StringToDate(a).valueOf() < StringToDate(b).valueOf() ? 1 : -1);
    const transactionDatesSet = new Set(sortedTransactionDatesArray);

    //console.log(Array.from(transactionDatesSet));

    return (
        <Screen>
            <FlatList
                data={Array.from(transactionDatesSet)}
                renderItem={({item: date}) =>
                    <View >
                        <DayOfTransactions
                            transactions={getFilteredTransactionsByDate(date)}/>
                        <Spacer height={24}/>
                    </View>
                }
            />
        </Screen>
    )

    function getValueByDate(date: string) {
        const filteredTransactionsByDate = transactions.filter((transaction) => transaction.date === date);
        //console.log(filteredTransactionsByDate);
        return filteredTransactionsByDate.reduce(
            (acc, cur) => acc + cur.value,
            0
        );
    }
    function getFilteredTransactionsByDate(date: string){
        return transactions.filter((transaction) => transaction.date === date);
    }
}