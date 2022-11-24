import {StyleSheet, View} from "react-native";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {FontSize, Text} from "../../vanguard/Text/Text";
import {Image} from "../../vanguard/Image/Image";

interface Props {
    categoryName: string;
    categoryID: number;
    date: string;
    value: number;
}

export function RecentTransaction(props: Props) {
    const {categoryID,categoryName, date, value} = props;

    return (
        <View style={styles.container}>
            <Image
                index={categoryID}
                width={40}
                height={40}/>
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
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
    },
    price: {
        padding: 16,
    }
})