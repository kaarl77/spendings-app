import {Text} from "react-native";
import {Screen} from "../../common-components/Screen/Screen";
import {useRoute} from "@react-navigation/native";
import {TabScreensRouteProp} from "../../navigation/NavigationTypes";
import {useContext} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";

export function Transactions() {
    //const {params:{transactions}} = useRoute<TabScreensRouteProp<"Transactions">>();
   const {transactions, categories} = useContext(GlobalContext);
    //flatlist

    console.log(transactions[0].value);
    return (
        <Screen>
            <Text>Transactions</Text>
        </Screen>
    )
}