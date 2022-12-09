import {Button as ButtonBase} from "react-native-paper";
import {StyleSheet, ViewStyle} from "react-native";
import React from "react";
import {useVanguardTheme} from "../../theming/colors/useVanguardTheme";

export enum ButtonType {
  Primary = "ButtonTypePrimary",
  Secondary = "ButtonTypeSecondary",
  Default = "ButtonTypeDefault",
}

interface Props {
  title: string;
  onPress: () => void;
  buttonType?: ButtonType,
  styleProp?: ViewStyle,
  disabled?: boolean
}

export function Button(props: Props) {
  const {title, onPress, buttonType = ButtonType.Default, styleProp, disabled = false} = props;
  const {PalettePrimary, PaletteNeutral} = useVanguardTheme();

  const primaryColor = PalettePrimary["600"];

  const style = {
    ...styles.container,
    ...styleProp,
    opacity: disabled ? 0.5 : 1,
  }

  const buttonProps: Record<ButtonType, Omit<React.ComponentProps<typeof ButtonBase>, 'children'>> = {
    ButtonTypePrimary: {
      buttonColor: primaryColor,
      textColor: PaletteNeutral["100"],
    },
    ButtonTypeSecondary: {
      buttonColor: PaletteNeutral["100"],
      textColor: PaletteNeutral["1000"],
    },
    ButtonTypeDefault: {
      buttonColor: "transparent",
      textColor: primaryColor,
    },
  }

  return <ButtonBase
    onPress={() => {
      !disabled && onPress()
    }}
    {...buttonProps[buttonType]}
    style={style}
  >{title}
  </ButtonBase>
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
  },
})