import {FlatList, StyleSheet, View} from "react-native";
import {Transaction} from "../../custom-types/Transaction";
import {FontSize, Text} from "../../vanguard/Text/Text";
import React, {useContext} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import { TransactionForDay } from "../TransactionForDay/TransactionForDay";

interface Props {
    transactions: Transaction[];
}

export function ListOfTransactionsByDay(props: Props) {
    const {transactions} = props;
    const {categories} = useContext(GlobalContext)
    return (
        <FlatList
            data={transactions}
            renderItem={
                ({item, index}) =>
                    <>
                        <TransactionForDay
                            categoryName={categories[item.categoryId].name}
                            value={item.value}
                            note={item.note}/>
                        <View>
                            {index !== transactions.length -1 && <Spacer height={16}/>}
                        </View>

                    </>
            }/>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "center",
        flex: 1,
        padding: 8,
        //borderRadius: 4,
    },
    logoPlaceholder: {
        width: 40,
        height: 40,
        backgroundColor: "grey",
    },
})