import {FlatList, StyleSheet, View} from "react-native";
import {Transaction} from "../../custom-types/Transaction";
import {FontSize, Text} from "../../vanguard/Text/Text";
import {useContext} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {Spacer} from "../../vanguard/Spacer/Spacer";

interface Props {
    transactions: Transaction[];
}

export function ListOfTransactionsByDay(props: Props) {
    const {transactions} = props;
    const {categories} = useContext(GlobalContext)
    return (
        <FlatList
            data={transactions}
            renderItem={
                ({item, index}) =>
                    <>
                        <View style={styles.container}>

                            <View style={styles.logoPlaceholder}/>
                            <Spacer width={8}/>

                            <View style={{flex: 1, borderRadius: 4}}>
                                <Text bold={true} color={"#2E2880"}>{categories[item.categoryId].name}</Text>
                                <Text fontSize={FontSize.small}>{item.note}</Text>
                            </View>

                            <View style={{height: "100%"}}>
                                <Text color={"#201C5A"}>{item.value}</Text>
                            </View>
                        </View>
                        <View>
                            {index !== transactions.length -1 && <Spacer height={16}/>}
                        </View>
                    </>
            }/>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "center",
        flex: 1,
        padding: 8,
        //borderRadius: 4,
    },
    logoPlaceholder: {
        width: 40,
        height: 40,
        backgroundColor: "grey",
    },
})