import {Transaction} from "../../custom-types/Transaction";
import {StyleSheet, View} from "react-native";
import {Category} from "../../custom-types/Category";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TopSpending} from "../../components/TopSpending/TopSpending";
import React, {useContext} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";

interface Props {
    transactions: Transaction[];
    totalSpent: number;
}

export function TransactionList(props: Props) {
    const {transactions,  totalSpent} = props;
    const {categories} = useContext(GlobalContext);

    return (
        <View style={styles.container}>
            {
                transactions.map((transaction, index) => {
                    return (
                        <React.Fragment key={transaction.id}>
                            <TopSpending
                                categoryName={categories[transaction.categoryId].name}
                                value={transaction.value}
                                percentage={Math.floor(((transaction.value) / totalSpent) * 100)}
                                categoryID={categories[transaction.categoryId].id}/>
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
})