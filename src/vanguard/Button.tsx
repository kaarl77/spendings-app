import {Button as ButtonBase} from "react-native-paper";
import {StyleSheet, ViewStyle} from "react-native";
import React from "react";

export enum ButtonType {
    Primary = "ButtonTypePrimary",
    Secondary = "ButtonTypeSecondary",
    Default = "ButtonTypeDefault",
}

interface Props {
    title: string;
    onPress?: () => void;
    buttonType?: ButtonType,
}

export function Button(props: Props) {
    const {title, onPress, buttonType = ButtonType.Default} = props;

    const primaryColor = "blue";

    // const buttonStyles:Record<ButtonType, ViewStyle>={
    //     ButtonTypePrimary: {
    //         backgroundColor: primaryColor,
    //
    //     },
    //     ButtonTypeSecondary: {
    //
    //     },
    //     ButtonTypeDefault: {
    //
    //     },
    //}

    const buttonProps: Record<ButtonType,Omit<React.ComponentProps<typeof ButtonBase>, 'children'>> = {
        ButtonTypePrimary: {
            buttonColor: primaryColor,
            textColor: "white",
        },
        ButtonTypeSecondary: {
            buttonColor: "white",
            textColor: "black",
        },
        ButtonTypeDefault: {
            buttonColor: "transparent",
            textColor: primaryColor,
        },
    }

    const primaryProps = buttonProps[ButtonType.Primary];

    return <ButtonBase
        onPress={onPress}
        {...buttonProps[buttonType]}
        style={styles.container}
    >{title}
    </ButtonBase>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        marginHorizontal:10,
        width:180,
    },
})