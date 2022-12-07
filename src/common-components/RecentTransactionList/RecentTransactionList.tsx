import {StyleSheet, View, ViewStyle} from "react-native";
import {Transaction} from "../../custom-types/Transaction";
import {RecentTransaction} from "../RecentTransaction/RecentTransaction";
import React, {useContext} from "react";
import {StringToDate} from "../../utils/date-utils";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {useVanguardTheme} from "../../colors/useVanguardTheme";
import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";

interface Props {
  styleProp?: ViewStyle;
  transactions: Transaction[];
}

export function RecentTransactionList(props: Props) {
  const {styleProp, transactions} = props;
  const {categories} = useContext(GlobalContext);
  const {PaletteNeutral} = useVanguardTheme();

  const style = {
    backgroundColor: PaletteNeutral["200"],
    ...styles.container,
    ...styleProp,
  }

  const navigation = useNavigation<TabScreensNavigationProp<"Homepage">>();


  return (
    <View style={style}>
      {
        transactions.map((transaction, index) => {
          return <React.Fragment key={transaction.id}>
            <RecentTransaction
              date={StringToDate(transaction.date).format('dddd, D MMMM YYYY')}
              value={transaction.value}
              categoryName={categories[transaction.categoryId].name}
              categoryID={transaction.categoryId}
              onPress={() => navigation.navigate("AddEditTransaction", {transaction})}
            />
            {index !== transactions.length - 1 && <Spacer height={16}/>}
          </React.Fragment>
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
})