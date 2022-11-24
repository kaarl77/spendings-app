import {StyleSheet, View} from "react-native";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {FontSize, Text} from "../../vanguard/Text/Text";

interface Props {
    categoryName: string;
    note: string;
    value: number;
}

export function TransactionForDay(props: Props) {
    const {categoryName, note, value} = props;
    return (
        <View style={styles.container}>

            <View style={styles.logoPlaceholder}/>
            <Spacer width={8}/>

            <View style={{flex: 1, borderRadius: 4}}>
                <Text bold={true} color={"#2E2880"}>{categoryName}</Text>
                <Text fontSize={FontSize.small}>{note}</Text>
            </View>

            <View style={{height: "100%"}}>
                <Text color={"#201C5A"}>{value}</Text>
            </View>
        </View>
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
        borderRadius: 4,
    },
    logoPlaceholder: {
        width: 40,
        height: 40,
        backgroundColor: "grey",
    },
})