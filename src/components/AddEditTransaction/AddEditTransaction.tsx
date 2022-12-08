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
import {Transaction} from "../../custom-types/Transaction";
import {areObjectsEqual} from "../../utils/obj-utils";

type Props = BottomTabScreenProps<TabStackParamList, "AddEditTransaction">
type routeProp = Props['route']

export function AddEditTransaction() {
  const {params} = useRoute<routeProp>();
  const {categories, addTransaction, editTransaction} = useContext(GlobalContext);

  const transaction = params?.transaction;
  const navigation = useNavigation<TabScreensNavigationProp<"AddEditTransaction">>();
  const [locked, setLocked] = useState(true);

  const getButtonTitle = () => {
    return locked ? "Edit" : "Cancel";
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button title={"Back"} onPress={() => navigation.goBack()}/>
      ),
      headerRight: () => (
        <Button
          title={locked ? "Edit" : "Cancel"}
          onPress={() => setLocked((locked) => !locked)}/>
      )
    })
    if (locked) {
      console.log("nnn");
      setValue(initialValue);
      setNote(initialNote);
      setCategoryId(initialCategoryId);
      setDate(initialDate);
    }

  }, [navigation, locked]);

  const [value, setValue] = useState(transaction?.value.toString() ?? "");
  const [note, setNote] = useState(transaction?.note ?? "");
  const [categoryId, setCategoryId] = useState(transaction?.categoryId ?? -1);
  const [date, setDate] = useState(transaction?.date ?? "");
  const [editedTransaction, setEditedTransaction] = useState<Transaction>();

  const initialValue = transaction?.value.toString() ?? "";
  const initialNote = transaction?.note ?? "";
  const initialCategoryId = transaction?.categoryId ?? -1;
  const initialDate = transaction?.date ?? "";

  useEffect(() => {
    if (transaction) {
      setEditedTransaction({
          id: transaction.id,
          value: parseFloat(value),
          date: date,
          note: note,
          categoryId: categoryId,
        }
      )
    }
  }, [value, note, categoryId, date])

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
          value={locked ? initialNote : note}
          onChangeText={(note) => setNote(note)}
          style={{backgroundColor: theme.PaletteNeutral["200"]}}
          disabled={locked}
          textColor={theme.PaletteNeutral["1000"]}

        />
        <TextInput
          mode={"outlined"}
          keyboardType={'numeric'}
          label={"Value"}
          value={locked ? initialValue.toString() : value.toString()}
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
          defaultValue={locked ? categories[initialCategoryId] : categories[categoryId]}
          disabled={locked}
        />
        <TextInput
          mode={"outlined"}
          label={"Date"}
          value={locked ? initialDate : date}
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
          disabled={getButtonDisabled()}
        />
      </ScrollView>
    </Screen>
  )

  function getButtonDisabled() {
    if (transaction === undefined) {
      return locked;
    }

    if (locked) {
      return true
    }

    return areObjectsEqual(transaction, editedTransaction);
  }


  function addOrEditTransaction() {
    if (transaction === undefined) {
      addTransaction({note, date, categoryId, value: parseFloat(value)})
      Toast.show({
        type: "success",
        text1: "Transaction added",
      })
    } else {
      editedTransaction && editTransaction(editedTransaction);
      Toast.show({
        type: "success",
        text1: "Transaction edited",
      })
    }
    navigation.goBack();
  }

  //value={locked ? transaction?.note : note}

}


