import {StyleSheet, View} from "react-native";
import {Text} from "../../vanguard/Text/Text";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {Image, ImageSource} from "../../vanguard/Image/Image";
import {useContext} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";

interface Props {
    categoryName: string;
    categoryID: number;
    value: number;
    percentage: number;
}

export function TopSpending(props: Props) {
    const {categoryName, value, percentage, categoryID} = props;
    return (
        <View style={styles.container}>
            {/*<View style={styles.logoPlaceholder}/>*/}
            <Image
                index={categoryID}
                width={40}
                height={40}/>
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
    textContainer: {
        flex: 1,
    }
})