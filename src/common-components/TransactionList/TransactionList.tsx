import {Transaction} from "../../custom-types/Transaction";
import {StyleSheet, View} from "react-native";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TopSpending} from "../../components/TopSpending/TopSpending";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import {Spacings} from "../../theming/spacings/Spacings";
import {useSelector} from "react-redux";
import {RootState} from "../../redux-stores/rootStore";

interface Props {
  transactions: Transaction[];
  totalSpent: number;
}

export function TransactionList(props: Props) {
  const {transactions, totalSpent} = props;
  const {categories} = useSelector((state: RootState)=>state.root);
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
              {index !== transactions.length - 1 && <Spacer height={Spacings["--2x"]}/>}
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