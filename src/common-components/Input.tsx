import {KeyboardTypeOptions, StyleSheet, TextInput, View} from "react-native";
import {FontSize, Text} from "../vanguard/Text/Text";
import {Spacer} from "../vanguard/Spacer/Spacer";
import {useVanguardTheme} from "../colors/useVanguardTheme";

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
      <Spacer height={4}/>

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
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
    borderWidth: 1,
  }
})