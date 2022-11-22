import {StyleSheet, View, ViewStyle} from "react-native";
import {Text} from "../../vanguard/Text/Text";
import {Transaction} from "../../custom-types/Transaction";
import {RecentTransaction} from "../RecentTransaction/RecentTransaction";
import React from "react";
import {Category} from "../../custom-types/Category";
import {StringToDate} from "../../utils/date-utils";
import {Spacer} from "../../vanguard/Spacer/Spacer";

interface Props {
    styleProp?: ViewStyle;
    transactions: Transaction[];
    categories: Category[];
}

export function RecentTransactionList(props: Props) {
    const {styleProp, transactions, categories} = props;

    const style = {
        ...styles.container,
        ...styleProp,
    }

    return (
        <View style={style}>
            {
                transactions.map((transaction, index) => {
                    return <React.Fragment key = {transaction.id}>
                        <RecentTransaction
                            date={StringToDate(transaction.date).format('dddd, D MMMM YYYY')}
                            value={transaction.value}
                            categoryName={ categories[transaction.categoryId].name }/>
                        {index !== transactions.length - 1 && <Spacer height={16}/>}
                    </React.Fragment>
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F4F4",
        padding: 16,
    },
})