import {Screen} from "../../common-components/Screen/Screen";
import {useRoute} from "@react-navigation/native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {TabStackParamList} from "../../navigation/TabNavigator";
import {TextInput} from "react-native-paper";
import {useContext, useState} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {Button} from "../../vanguard/Button/Button";
import {ScrollView} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import {Category} from "../../custom-types/Category";
import {Transaction} from "../../custom-types/Transaction";
import {parse} from "react-native-svg";

type Props = BottomTabScreenProps<TabStackParamList, "AddEditTransaction">
type routeProp = Props['route']

/**
 * value, date, category, note
 *
 */

export function AddEditTransaction() {

  const {params} = useRoute<routeProp>();
  const {categories, transactions, addTransaction, editTransaction} = useContext(GlobalContext);

  const transaction = params?.transaction;

  const [value, setValue] = useState(transaction?.value.toString() ?? "");
  const [note, setNote] = useState(transaction?.note ?? "");
  const [categoryId, setCategoryId] = useState(transaction?.categoryId ?? 0);
  const [date, setDate] = useState(transaction?.date ?? "");
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);

  const categoriesAsString = categories.map((category) => category.name);


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
        />
        <TextInput
          mode={"outlined"}
          keyboardType={'numeric'}
          label={"Value"}
          value={value?.toString()}
          onChangeText={(value) => setValue(value)}
        />
        <SelectDropdown
          data={categories}
          onSelect={(category) => {
            setCategoryId((category as Category).id)
          }}
          buttonTextAfterSelection={(category) => (category as Category).name}
          rowTextForSelection={(category) => (category as Category).name}
          defaultValue={categories[categoryId].name}
        />

        <TextInput
          mode={"outlined"}
          label={"Date"}
          value={date}
          onChangeText={(date) => setDate(date)}
        />
        <Button
          title={"Submit changes"}
          onPress={
            addOrEditTransaction
          }/>
      </ScrollView>
    </Screen>
  )



  function addOrEditTransaction() {
    if (transaction == undefined) {
      addTransaction({note, date, categoryId, value: parseFloat(value)})
    }
    
  }


  function initialCategoryState() {
    if (transaction != undefined)
      return categories[transaction.categoryId].name;
    return "";
  }

}


