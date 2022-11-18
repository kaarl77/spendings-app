import {StyleSheet, View} from "react-native";
import {Text} from "../../vanguard/Text/Text";
import {Spacer} from "../../vanguard/Spacer/Spacer";

interface Props {
    categoryName: string;
    value: number;
    percentage: number;
}

export function TopSpending(props: Props) {
    const {categoryName, value, percentage = 22} = props;
    return (
        <View style={styles.container}>
            <View style={styles.logoPlaceholder}/>
            <Spacer width={16}/>

            <View style={{flex:1, flexDirection: "row"}}>
                <View style={styles.textContainer}>
                    <Text bold={true}>
                        {categoryName}
                    </Text>
                    <Text>
                        {value}
                    </Text>
                </View>

                <Spacer width={8}/>
                <Text> {percentage}% </Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "white",
        alignItems: "center",
        flexDirection: "row",
        padding: 8,
        gap: 16,
    },
    logoPlaceholder: {
        width: 40,
        height: 40,
        backgroundColor: "grey",
    },
    textContainer: {
        flex: 1,
    }
})