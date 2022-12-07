import {Screen} from "../../common-components/Screen/Screen";
import {useNavigation, useRoute} from "@react-navigation/native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {TabStackParamList} from "../../navigation/TabNavigator";
import {TextInput} from "react-native-paper";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {Button, ButtonType} from "../../vanguard/Button/Button";
import {ScrollView} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import {Category} from "../../custom-types/Category";
import {useVanguardTheme} from "../../colors/useVanguardTheme";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import Toast from "react-native-toast-message";

type Props = BottomTabScreenProps<TabStackParamList, "AddEditTransaction">
type routeProp = Props['route']

/**
 * value, date, category, note
 *
 */

export function AddEditTransaction() {

  const {params} = useRoute<routeProp>();
  const {categories, addTransaction, editTransaction} = useContext(GlobalContext);

  const transaction = params?.transaction;
  const navigation = useNavigation<TabScreensNavigationProp<"AddEditTransaction">>();

  const [locked, isLocked] = useState(true);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button title={"Back"} onPress={() => navigation.goBack()}/>
      ),
      headerRight: () => (
        <Button title={"Edit"} onPress={() => isLocked(!locked)}/>
      )
    })
  }, [navigation, locked]);

  const [value, setValue] = useState(transaction?.value.toString() ?? "");
  const [note, setNote] = useState(transaction?.note ?? "");
  const [categoryId, setCategoryId] = useState(transaction?.categoryId ?? -1);
  const [date, setDate] = useState(transaction?.date ?? "");

  const theme = useVanguardTheme();

  return (
    <Screen>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        automaticallyAdjustKeyboardInsets={true}
      >
        <TextInput
          mode={"outlined"}
          label={"Note"}
          value={note}
          onChangeText={(note) => setNote(note)}
          style={{backgroundColor: theme.PaletteNeutral["200"]}}
          disabled={locked}
          textColor={theme.PaletteNeutral["1000"]}
        />
        <TextInput
          mode={"outlined"}
          keyboardType={'numeric'}
          label={"Value"}
          value={value?.toString()}
          onChangeText={(value) => setValue(value)}
          style={{backgroundColor: theme.PaletteNeutral["200"]}}
          disabled={locked}
          textColor={theme.PaletteNeutral["1000"]}
        />
        <SelectDropdown
          data={categories}
          onSelect={(category) => {
            setCategoryId((category as Category).id)
          }}
          buttonTextAfterSelection={(category) => (category as Category).name}
          rowTextForSelection={(category) => (category as Category).name}
          defaultValue={categories[categoryId]}
          disabled={locked}

        />
        <TextInput
          mode={"outlined"}
          label={"Date"}
          value={date}
          onChangeText={(date) => setDate(date)}
          style={{backgroundColor: theme.PaletteNeutral["100"]}}
          disabled={locked}
        />
        <Button
          title={"Submit changes"}
          onPress={
            addOrEditTransaction
          }
          styleProp={{
            backgroundColor: theme.PalettePrimary["600"]
          }}
          buttonType={ButtonType.Primary}
          disabled={locked}
        />
      </ScrollView>
    </Screen>
  )


  function addOrEditTransaction() {
    if (transaction == undefined) {
      addTransaction({note, date, categoryId, value: parseFloat(value)})
      Toast.show({
        type: "success",
        text1: "Transaction added",
      })
    }
    if (transaction) {
      editTransaction(transaction);
      Toast.show({
        type: "success",
        text1: "Transaction edited",
      })
    }

    navigation.goBack();


  }
}


