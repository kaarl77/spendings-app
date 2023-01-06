import {FlatList, View} from "react-native";
import {Transaction} from "../../custom-types/Transaction";
import React from "react";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TransactionForDay} from "../TransactionForDay/TransactionForDay";
import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import {Spacings} from "../../theming/spacings/Spacings";
import {useSelector} from "react-redux";
import {RootState} from "../../redux-stores/rootStore";

interface Props {
  transactions: Transaction[];
}

export function ListOfTransactionsByDay(props: Props) {
  const {transactions} = props;
  const {categories} = useSelector((state: RootState) => state.root);

  const navigation = useNavigation<TabScreensNavigationProp<"Transactions">>();

  return (
    <FlatList
      data={transactions}
      renderItem={
        ({item, index}) =>
          <React.Fragment key={item.id}>
            <TransactionForDay
              categoryName={categories[item.categoryId].name}
              value={item.value}
              note={item.note}
              categoryID={item.categoryId}
              onPress={() => navigation.navigate("AddEditTransaction", {transaction: item})}
            />
            <View>
              {index !== transactions.length - 1 && <Spacer height={Spacings["--2x"]}/>}
            </View>

          </React.Fragment>
      }/>
  )
}