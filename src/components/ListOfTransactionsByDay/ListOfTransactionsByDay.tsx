import {FlatList, View} from "react-native";
import {Transaction} from "../../custom-types/Transaction";
import React, {useContext} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TransactionForDay} from "../TransactionForDay/TransactionForDay";

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
                            note={item.note}
                            categoryID={item.categoryId}
                        />
                        <View>
                            {index !== transactions.length - 1 && <Spacer height={16}/>}
                        </View>

                    </>
            }/>
    )
}