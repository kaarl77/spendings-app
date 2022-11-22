import {StyleSheet, View} from "react-native";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {FontSize, Text} from "../../vanguard/Text/Text";

interface Props {
    categoryName: string;
    date: string;
    value: number;
}

export function RecentTransaction(props: Props){
    const {categoryName, date, value}= props;

    return(
        <View style={styles.container}>
            <View style={styles.logoPlaceholder}/>
            <Spacer width={8}/>

            <View style={styles.textContainer}>
                <Text bold={true}>{categoryName}</Text>
                <Text fontSize={FontSize.small}>{date}</Text>
            </View>
            <Spacer width={8}/>

            <Text styleProp={styles.price}>{value}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        padding: 8,
    },
    logoPlaceholder: {
        width: 40,
        height: 40,
        backgroundColor: "grey",
    },
    textContainer: {
        flex: 1,
    },
    price: {
        padding: 16,
    }
})