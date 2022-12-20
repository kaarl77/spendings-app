import {FlatList, StyleSheet, View} from "react-native";
import {Screen} from "../../common-components/Screen/Screen";
import React, {useContext} from "react";
import {StringToDate} from "../../utils/date-utils";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {DayOfTransactions} from "../../common-components/DayOfTransactions/DayOfTransactions";
import {FAB} from "../../common-components/FAB/FAB";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import {Spacings} from "../../theming/spacings/Spacings";
import {useSelector} from "react-redux";
import {RootState} from "../../redux-stores/rootStore";

export function Transactions() {
  //const {transactions} = useContext(GlobalContext);
  const {transactions} = useSelector((state: RootState)=>state.root);

  const sortedTransactionDatesArray = transactions.map((transaction) => transaction.date).sort((a, b) => StringToDate(a).valueOf() < StringToDate(b).valueOf() ? 1 : -1);
  const transactionDatesSet = new Set(sortedTransactionDatesArray);

  const navigation = useNavigation<TabScreensNavigationProp<"Transactions">>();

  return (
    <Screen styleProp={styles.container}>
      <FlatList
        data={Array.from(transactionDatesSet)}
        renderItem={({item: date}) =>
          <View>
            <DayOfTransactions
              transactions={getFilteredTransactionsByDate(date)}/>
            <Spacer height={Spacings["--3x"]}/>
          </View>
        }
      />
      <FAB title={"+"} onPress={() => navigation.navigate("AddEditTransaction")}/>
    </Screen>
  )

  function getFilteredTransactionsByDate(date: string) {
    return transactions.filter((transaction) => transaction.date === date);
  }
}

const styles = StyleSheet.create({
  container: {},
})