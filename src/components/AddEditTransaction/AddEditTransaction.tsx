import {Screen} from "../../common-components/Screen/Screen";
import {useNavigation, useRoute} from "@react-navigation/native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {TabStackParamList} from "../../navigation/TabNavigator";
import React, {useEffect, useState} from "react";
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
import {AddEditTransactionSlice} from "./AddEditTransaction.slice";

type Props = BottomTabScreenProps<TabStackParamList, "AddEditTransaction">
type routeProp = Props['route']

export function AddEditTransaction() {
  const {params} = useRoute<routeProp>();
  const transaction = params?.transaction;

  const dispatch = useAppDispatch();
  const {categories, transactions} = useSelector((state: RootState) => state.root);
  const {date, categoryId, value, note, id} = useSelector((state: RootState) => state.addEditTransaction);
  const {newTransaction, editTransaction, removeTransaction} = RootSlice;
  const {
    setDate,
    setNote,
    setCategoryId,
    setValue,
    resetToInitialState,
    setInitialTransaction
  } = AddEditTransactionSlice;

  const navigation = useNavigation<TabScreensNavigationProp<"AddEditTransaction">>();
  const [locked, setLocked] = useState(!!transaction);

  useEffect(() => {
    transaction && dispatch(setInitialTransaction(transaction))
  }, [])


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
      dispatch(resetToInitialState());
    }

    return navigation.addListener("beforeRemove", () => {
      dispatch(resetToInitialState());
    });
  }, [navigation, locked]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState<Transaction>();


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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    dispatch(setDate(DateToString(moment(date))))
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
          onValueChange={(value) => {
            dispatch(setValue(value))
          }}
          disabled={locked}
          placeholder={"123.45"}
          keyboardType={"numeric"}
        />
        <Spacer height={Spacings["--3x"]}/>

        <CategoryDropdown
          data={categories}
          setData={(id) => {
            dispatch(setCategoryId(id))
          }}
          disabled={locked}
          categoryId={categoryId}
          initialCategoryId={categoryId}/>
        <Spacer height={Spacings["--3x"]}/>

        <Input
          label={"Note"}
          value={note}
          onValueChange={(note) => dispatch(setNote(note))}
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
            onValueChange={(date) => dispatch(setDate(date))}
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
      Toast.show({
        type: "success",
        text1: "Transaction added",
      })
    } else {
      dispatch(editTransaction({
        id,
        note,
        value: parseFloat(value),
        categoryId,
        date
      }))
      Toast.show({
        type: "success",
        text1: "Transaction edited",
      })
    }
    navigation.goBack();
  }

  function transactionRemover() {
    if (transaction) {
      dispatch(removeTransaction(transaction));
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
          onPress: transactionRemover,
        }
      ]
    )
  }
}