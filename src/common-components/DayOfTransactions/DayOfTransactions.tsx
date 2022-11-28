import {Transaction} from "../../custom-types/Transaction";
import {StyleSheet, View} from "react-native";
import {DayHeader} from "../DayHeader/DayHeader";
import {ListOfTransactionsByDay} from "../../components/ListOfTransactionsByDay/ListOfTransactionsByDay";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {useVanguardTheme} from "../../colors/useVanguardTheme";

interface Props {
    transactions: Transaction[];
}

export function DayOfTransactions(props: Props) {
    const {transactions} = props;

    const {PaletteNeutral} = useVanguardTheme();

    const containerStyle = {
        backgroundColor: PaletteNeutral["200"],
        ...styles.container,
    };

    return (
        <View style={containerStyle}>
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
        return filteredTransactionsByDate.reduce(
            (acc, cur) => acc + cur.value,
            0
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 4,
    },
})