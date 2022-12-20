import {StyleSheet, View, ViewStyle} from "react-native";
import {RecentTransaction} from "../RecentTransaction/RecentTransaction";
import React from "react";
import {StringToDate} from "../../utils/date-utils";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {useVanguardTheme} from "../../theming/colors/useVanguardTheme";
import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import {Spacings} from "../../theming/spacings/Spacings";
import {useSelector} from "react-redux";
import {RootState} from "../../redux-stores/rootStore";

interface Props {
  styleProp?: ViewStyle;

}

export function RecentTransactionList(props: Props) {
  const {styleProp} = props;
  const {PaletteNeutral} = useVanguardTheme();
  const {categories} = useSelector((state: RootState) => state.root);
  const {latest5Transactions} = useSelector((state: RootState) => state.homepage);


  const style = {
    backgroundColor: PaletteNeutral["200"],
    ...styles.container,
    ...styleProp,
  }

  const navigation = useNavigation<TabScreensNavigationProp<"Homepage">>();


  return (
    <View style={style}>
      {
        latest5Transactions.map((transaction, index) => {
          return <React.Fragment key={transaction.id}>
            <RecentTransaction
              date={StringToDate(transaction.date).format('dddd, D MMMM YYYY')}
              value={transaction.value}
              categoryName={categories[transaction.categoryId].name}
              categoryID={transaction.categoryId}
              onPress={() => navigation.navigate("AddEditTransaction", {transaction})}
            />
            {index !== latest5Transactions.length - 1 && <Spacer height={Spacings["--2x"]}/>
            }
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