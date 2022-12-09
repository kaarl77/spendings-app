import {Screen} from "../../common-components/Screen/Screen";
import {useNavigation, useRoute} from "@react-navigation/native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {TabStackParamList} from "../../navigation/TabNavigator";
import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {Button, ButtonType} from "../../vanguard/Button/Button";
import {Pressable, ScrollView, StyleSheet} from "react-native";
import {useVanguardTheme} from "../../colors/useVanguardTheme";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import Toast from "react-native-toast-message";
import {Transaction} from "../../custom-types/Transaction";
import {areObjectsEqual} from "../../utils/obj-utils";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {DateToString} from "../../utils/date-utils";
import {Input} from "../../common-components/Input";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {CategoryDropdown} from "../CategoryDropdown/CategoryDropdown";

type Props = BottomTabScreenProps<TabStackParamList, "AddEditTransaction">
type routeProp = Props['route']

export function AddEditTransaction() {
  const {params} = useRoute<routeProp>();
  const {categories, addTransaction, editTransaction, transactions, setTransactions} = useContext(GlobalContext);
  const theme = useVanguardTheme();

  const transaction = params?.transaction;
  const navigation = useNavigation<TabScreensNavigationProp<"AddEditTransaction">>();
  const [locked, setLocked] = useState(true);

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

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(DateToString(moment(date)))
    hideDatePicker();
  };

  return (
    <Screen>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Spacer height={32}/>

        <Input
          label={"Value"}
          value={value}
          onValueChange={(value) => setValue(value)}
          disabled={locked}
          placeholder={"123.45"}
          keyboardType={"numeric"}
        />
        <Spacer height={24}/>

        <CategoryDropdown
          data={categories}
          setData={setCategoryId}
          disabled={locked}
          categoryId={categoryId}
          initialCategoryId={initialCategoryId}/>
        <Spacer height={24}/>

        <Input
          label={"Note"}
          value={locked ? initialNote : note}
          onValueChange={(note) => setNote(note)}
          disabled={locked}
          placeholder={"meaningful details"}
        />
        <Spacer height={24}/>

        <Pressable
          onPress={() => {
            showDatePicker();
          }}
          disabled={locked}>
          <Input
            label={"Date"}
            value={date}
            onValueChange={(date) => setDate(date)}
            disabled={locked}
            placeholder={"01-01-1970"}
            pointerEvents={"none"}
          />
        </Pressable>

        <DateTimePickerModal
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          mode={"date"}
          isVisible={isDatePickerVisible}/>

        <Spacer height={24}/>

        <Button
          title={"Save"}
          onPress={
            addOrEditTransaction
          }
          buttonType={ButtonType.Primary}
          disabled={getButtonDisabled()}
        />

        <Spacer height={24}/>

        {transaction &&
            <Button
                title={"Delete"}
                onPress={removeTransaction}
                styleProp={{backgroundColor: "red"}}
                buttonType={ButtonType.Primary}
                disabled={!locked}
            />
        }
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

  function removeTransaction() {
    if (transaction) {
      setTransactions(transactions.filter((item) => item.id !== transaction.id))
      Toast.show({
        type: "success",
        text1: "Transaction removed",
      })
      navigation.goBack();
    }
  }
}