import {Screen} from "../../common-components/Screen/Screen";
import {useRoute} from "@react-navigation/native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {TabStackParamList} from "../../navigation/TabNavigator";
import {TextInput} from "react-native-paper";
import {useContext, useState} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {Button} from "../../vanguard/Button/Button";
import {parse} from "react-native-svg";

type Props = BottomTabScreenProps<TabStackParamList, "AddEditTransaction">
type routeProp = Props['route']

/**
 * value, date, category, note
 *
 */

export function AddEditTransaction() {

    const {params} = useRoute<routeProp>();
    const {categories, transactions} = useContext(GlobalContext);

    const transaction = params?.transaction;

    const [value, setValue] = useState("");
    const [note, setNote] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    // if (transaction == undefined){
    //     setCategory("");
    //     setNote("");
    //     setDate("");
    //     setValue("");
    // }
    // else{
    //     setCategory(categories[transaction.categoryId].name);
    //     setNote(transaction.note);
    //     setValue(transaction.value.toString());
    //     setDate(transaction.date);
    // }


    return (
        <Screen>
            <TextInput
                mode={"outlined"}
                label={"Note"}
                value={note}
                onChangeText={(note) => setNote(note)}
            />
            <TextInput
                mode={"outlined"}
                label={"Value"}
                value={value?.toString()}
                onChangeText={(value) => setValue(value)}
            />
            <TextInput
                mode={"outlined"}
                label={"Category"}
                value={category}
                onChangeText={(category) => setCategory(category)}
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

        </Screen>
    )

    function addOrEditTransaction(){
        if (transaction == undefined){
            transactions.push({
                id: transactions.length,
                note: note,
                date: date,
                value: parseFloat(value),
                categoryId: 1,
            })
        }
    }

}