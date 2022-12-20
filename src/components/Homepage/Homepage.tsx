import {Screen} from "../../common-components/Screen/Screen";
import React, {useContext, useEffect} from "react";
import {ReportSummary} from "../ReportSummary/ReportSummary";
import {ScrollView,} from "react-native";
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
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux-stores/rootStore";
import {RootSlice} from "../../redux-stores/root.slice";
import {HomepageSlice} from "./Homepage.slice";

export function Homepage() {
  const {
    setTransactions: setDeprecatedTransactions,
    setCategories: setDeprecatedCategories,
    categories: deprecatedCategories,
    transactions: deprecatedTransactions
  } = useContext(GlobalContext);

  const navigation = useNavigation<TabScreensNavigationProp<"Homepage">>();

  const {transactions} = useSelector((state: RootState) => state.root);
  const {latest5Transactions} = useSelector((state: RootState) => state.homepage);
  const dispatch = useAppDispatch();
  const {setTransactions, setCategories} = RootSlice;
  const {getLatest5Transactions} = HomepageSlice;

  useEffect(() => {
    getBoth()
      .then((value) => {
        dispatch(setTransactions(value.transactions));
        dispatch(setCategories(value.categories));
        setDeprecatedCategories(value.categories);
        setDeprecatedTransactions(value.transactions);

      })
  }, [])

  useEffect(()=>{
    dispatch(getLatest5Transactions(transactions));
  },[transactions])

  if (deprecatedTransactions.length === 0 || deprecatedCategories.length === 0) {
    return <EmptyState/>
  }

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text bold={true}>Reports summary</Text>
        <Spacer height={Spacings["--1x"]}/>

        <ReportSummary/>
        <Spacer height={Spacings["--3x"]}/>

        <RecentTransactions/>
      </ScrollView>
      <FAB title={"+"} onPress={() => navigation.navigate("AddEditTransaction")}/>
    </Screen>
  )
}
