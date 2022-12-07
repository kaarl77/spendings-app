import {Transaction} from "../../custom-types/Transaction";
import {StyleSheet, View} from "react-native";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TopSpending} from "../../components/TopSpending/TopSpending";
import React, {useContext} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";

interface Props {
  transactions: Transaction[];
  totalSpent: number;
}

export function TransactionList(props: Props) {
  const {transactions, totalSpent} = props;
  const {categories} = useContext(GlobalContext);
  const navigation = useNavigation<TabScreensNavigationProp<"Homepage">>()

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
                categoryID={categories[transaction.categoryId].id}
                onPress={() => navigation.navigate("AddEditTransaction", {transaction})}
              />
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