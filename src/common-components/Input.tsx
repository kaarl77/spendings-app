import {KeyboardTypeOptions, StyleSheet, TextInput, View} from "react-native";
import {FontSize, Text} from "../vanguard/Text/Text";
import {Spacer} from "../vanguard/Spacer/Spacer";
import {useVanguardTheme} from "../theming/colors/useVanguardTheme";
import {Spacings} from "../theming/spacings/Spacings";

interface Props {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
}


export function Input(props: Props) {
  const {placeholder, disabled, onValueChange, value, label, keyboardType, pointerEvents} = props;
  const theme = useVanguardTheme();

  const textInputStyle = {
    backgroundColor: theme.PaletteNeutral["000"],
    ...styles.textInput,
    opacity: disabled ? 0.5 : 1,
  }
  const containerStyle = {
    opacity: disabled ? 0.5 : 1,
  }

  return (
    <View style={containerStyle}>
      <Text
        fontSize={FontSize.medium}
      >
        {label}

      </Text>
      <Spacer height={Spacings['--0.5x']}/>

      <TextInput
        style={textInputStyle}
        keyboardType={keyboardType}
        value={value}
        onChangeText={(value) => onValueChange(value)}
        editable={!disabled}
        placeholder={placeholder}
        placeholderTextColor={theme.PaletteNeutral["400"]}
        pointerEvents={pointerEvents}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: Spacings["--5x"],
    paddingVertical: Spacings["--1x"],
    paddingHorizontal: Spacings["--2x"],
    borderRadius: 4,
    borderWidth: 1,
  }
})