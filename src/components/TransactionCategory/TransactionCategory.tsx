import {TimePeriod} from "../../common-components/TimePeriod/TimePeriodSelector";
import {Transaction} from "../../custom-types/Transaction";
import {Text} from "../../vanguard/Text/Text";
import {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Category} from "../../custom-types/Category";

interface Props {
    timePeriod: TimePeriod;
    transactions: Transaction[];
    totalSpent: number;
    totalOnPeriodChange: (resetValue: number) => void;


}

export function TransactionCategory(props: Props) {
    const {timePeriod, transactions, totalSpent, totalOnPeriodChange} = props;

    return (
        <View style={styles.container}>
            {
                transactions.map((transaction) => {
                    //const categoryIdOfTransaction:number = transaction.categoryId;
                    // @ts-ignore
                    //const category:Category = categories.find(searchedCategory => searchedCategory.id === categoryIdOfTransaction)
                    return (
                        <>
                            <View>
                                <Text>
                                    {transaction.value}

                                </Text>
                            </View>
                        </>
                    )
                })
            }</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: "row",
    },
    basicInfo: {},
    percentage: {}
})