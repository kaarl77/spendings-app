import {Transaction} from "../../custom-types/Transaction";
import {StyleSheet, View} from "react-native";
import {Text} from "../../vanguard/Text/Text";
import {Category} from "../../custom-types/Category";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import moment from "moment";
import {TopSpending} from "../../components/TopSpending/TopSpending";
import React from "react";

interface Props {
    transactions: Transaction[];
    categories: Category[];
    totalSpent: number;
}

export function TransactionList(props: Props) {
    const {transactions, categories, totalSpent} = props;

    return (
        <View style={styles.container}>
            {
                transactions.map((transaction, index) => {
                    return (
                        <React.Fragment key={transaction.id}>
                            <TopSpending
                                categoryName={categories[transaction.categoryId].name}
                                value={transaction.value}
                                percentage={Math.floor(((transaction.value) / totalSpent) * 100)}/>
                            {index !== transactions.length - 1 && <Spacer height={16}/>}
                        </React.Fragment>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    transaction: {
        backgroundColor: "white",
        //alignItems: "flex-start",
        position: "relative",
        flexDirection: "row",
        padding: 8,
        gap: 16,
    },

})