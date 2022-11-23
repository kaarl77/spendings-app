import {Transaction} from "../../custom-types/Transaction";
import {StyleSheet, View} from "react-native";
import {DayHeader} from "../DayHeader/DayHeader";
import {StringToDate} from "../../utils/date-utils";
import {ListOfTransactionsByDay} from "../../components/ListOfTransactionsByDay/ListOfTransactionsByDay";
import {Spacer} from "../../vanguard/Spacer/Spacer";

interface Props {
    transactions: Transaction[];

}

export function DayOfTransactions(props: Props) {
    const {transactions} = props;

    return (
        <View style={styles.container}>
            <DayHeader
                dateString={transactions[0].date}
                value={getValueByDate(transactions[0].date)}
            />
            <Spacer height={16}/>
            <ListOfTransactionsByDay
                transactions={transactions}/>
        </View>
    )

    function getValueByDate(date: string) {
        const filteredTransactionsByDate = transactions.filter((transaction) => transaction.date === date);
        //console.log(filteredTransactionsByDate);
        return filteredTransactionsByDate.reduce(
            (acc, cur) => acc + cur.value,
            0
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#E8E8E8",
        borderRadius: 4,
    },
})