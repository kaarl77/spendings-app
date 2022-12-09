import {Screen} from "../../common-components/Screen/Screen";
import React, {useContext, useEffect} from "react";
import {ReportSummary} from "../ReportSummary/ReportSummary";
import {Platform, ScrollView, StyleSheet,} from "react-native";
import {Text} from "../../vanguard/Text/Text";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {RecentTransactions} from "../RecentTransactions/RecentTransactions";
import {getBoth} from "../../api/api";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {FAB} from "../../common-components/FAB/FAB";
import {EmptyState} from "../EmptyState/EmptyState";
import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import {Spacings} from "../../theming/spacings/Spacings";

export function Homepage() {
  const {transactions, categories, setTransactions, setCategories} = useContext(GlobalContext);

  const navigation = useNavigation<TabScreensNavigationProp<"Homepage">>();

  useEffect(() => {
    getBoth()
      .then((value) => {
        setTransactions(value.transactions);
        setCategories(value.categories);
      })
  }, [])


  if (transactions.length === 0 || categories.length === 0) {
    return <EmptyState/>
  }

  return (
    <Screen styleProp={styles.container}>
      <ScrollView>
        <Spacer height={Spacings["--4x"]}/>

        <Text bold={true}>Reports summary</Text>
        <Spacer height={Spacings["--1x"]}/>

        <ReportSummary
          transactions={transactions}
        />
        <Spacer height={Spacings["--3x"]}/>

        <RecentTransactions
          transactions={transactions}/>
      </ScrollView>
      <FAB title={"+"} onPress={() => navigation.navigate("AddEditTransaction")}/>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? Spacings["--4x"] : 0,
  }
})

