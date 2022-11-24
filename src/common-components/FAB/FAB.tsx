import {Pressable, StyleSheet} from "react-native";
import {FontSize, Text} from "../../vanguard/Text/Text";

interface Props {
    onPress?: () => void;
    title: string
}

export function FAB(props: Props){
    const {title, onPress} = props;

    return (
        <Pressable
            style={styles.container}
            onPress={onPress}>
            <Text color={"white"} fontSize={FontSize.large}>{title}</Text>
        </Pressable>
    )
}

const styles= StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 500,
        position: "absolute",
        bottom: 24,
        right: 24,
        backgroundColor: "#4940CB",
        height: 60,
        width: 60,
    },
})