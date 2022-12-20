import {Screen} from "../../common-components/Screen/Screen";
import {useNavigation, useRoute} from "@react-navigation/native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {TabStackParamList} from "../../navigation/TabNavigator";
import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {Button, ButtonType} from "../../vanguard/Button/Button";
import {Alert, Pressable, ScrollView} from "react-native";
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
import {Spacings} from "../../theming/spacings/Spacings";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux-stores/rootStore";
import {RootSlice} from "../../redux-stores/root.slice";

type Props = BottomTabScreenProps<TabStackParamList, "AddEditTransaction">
type routeProp = Props['route']

export function AddEditTransaction() {
  const {params} = useRoute<routeProp>();
  const {addTransaction, editTransaction, setTransactions} = useContext(GlobalContext);
  const {categories, transactions} = useSelector((state: RootState)=>state.root);

  const dispatch = useAppDispatch();
  const {newTransaction} = RootSlice;

  const transaction = params?.transaction;
  const navigation = useNavigation<TabScreensNavigationProp<"AddEditTransaction">>();
  const [locked, setLocked] = useState(!!transaction);

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
    <Screen hasSafePadding={false}>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
      >
        <Spacer height={Spacings["--4x"]}/>

        <Input
          label={"Value"}
          value={value}
          onValueChange={(value) => setValue(value)}
          disabled={locked}
          placeholder={"123.45"}
          keyboardType={"numeric"}
        />
        <Spacer height={Spacings["--3x"]}/>

        <CategoryDropdown
          data={categories}
          setData={setCategoryId}
          disabled={locked}
          categoryId={categoryId}
          initialCategoryId={initialCategoryId}/>
        <Spacer height={Spacings["--3x"]}/>

        <Input
          label={"Note"}
          value={locked ? initialNote : note}
          onValueChange={(note) => setNote(note)}
          disabled={locked}
          placeholder={"meaningful details"}
        />
        <Spacer height={Spacings["--3x"]}/>

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

        <Spacer height={Spacings["--3x"]}/>

        <Button
          title={"Save"}
          onPress={
            addOrEditTransaction
          }
          buttonType={ButtonType.Primary}
          disabled={getButtonDisabled()}
        />

        <Spacer height={Spacings["--3x"]}/>

        {transaction &&
            <Button
                title={"Delete"}
                onPress={createTwoButtonAlert}
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
      dispatch(newTransaction({
        id: transactions.length,
        note: note,
        categoryId: categoryId,
        date: date,
        value: parseFloat(value)
      }));

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

  function createTwoButtonAlert() {
    Alert.alert(
      "Are you sure?",
      "This will delete the current transaction",
      [
        {
          text: "Cancel",
          onPress: () => {
          },
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: removeTransaction,
        }
      ]
    )
  }
}