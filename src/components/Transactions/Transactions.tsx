import {FlatList} from "react-native";
import {Screen} from "../../common-components/Screen/Screen";
import React from "react";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {DayOfTransactions} from "../../common-components/DayOfTransactions/DayOfTransactions";
import {FAB} from "../../common-components/FAB/FAB";
import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import {Spacings} from "../../theming/spacings/Spacings";
import {useSelector} from "react-redux";
import {RootState} from "../../redux-stores/rootStore";

export function Transactions() {
  const navigation = useNavigation<TabScreensNavigationProp<"Transactions">>();
  const {uniqueDatesSorted} = useSelector((state: RootState) => state.root);
  return (
    <Screen>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={uniqueDatesSorted}
        renderItem={({index: i}) => {
          return <>
            <DayOfTransactions
              i={i}
            />
            <Spacer height={Spacings["--3x"]}/>
          </>
        }
        }
      />
      <FAB title={"+"} onPress={() => navigation.navigate("AddEditTransaction")}/>
    </Screen>
  )
}
