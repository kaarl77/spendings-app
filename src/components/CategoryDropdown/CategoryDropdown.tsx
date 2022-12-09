import SelectDropdown from 'react-native-select-dropdown'
import {Category} from "../../custom-types/Category";
import {CategoryDropdownRowChild} from "../CategoryDropdownRowChild/CategoryDropdownRowChild";
import {StyleSheet, View} from "react-native";
import {FontSize, Text} from "../../vanguard/Text/Text";
import {useVanguardTheme} from "../../colors/useVanguardTheme";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {CategoryDropdownButtonChild} from "../CategoryDropdownButtonChild/CategoryDropdownButtonChild";


interface Props {
  data: Category[],
  setData: (id: number) => void;
  disabled: boolean;
  categoryId: number;
  initialCategoryId: number;
}

export function CategoryDropdown(props: Props) {
  const {disabled, data, setData, initialCategoryId, categoryId} = props;
  const {PaletteNeutral} = useVanguardTheme();

  const dropdownButtonStyle = {
    ...styles.categoryDropdownButton,
    backgroundColor: PaletteNeutral["000"],
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
        Category
      </Text>
      <Spacer height={4}/>
      <SelectDropdown
        buttonStyle={dropdownButtonStyle}
        data={data}
        onSelect={(category) => {
          setData((category as Category).id)
        }}
        buttonTextAfterSelection={(category) => (category as Category).name}
        rowTextForSelection={(category) => (category as Category).name}
        defaultValue={disabled ? data[initialCategoryId] : data[categoryId]}
        disabled={disabled}
        renderCustomizedRowChild={(category) => {
          return (
            <CategoryDropdownRowChild
              categoryId={(category as Category).id}/>
          )
        }}

        renderCustomizedButtonChild={(category) => {
          return (
            <CategoryDropdownButtonChild
              category={category}
              disabled={disabled}
              categoryId={categoryId}/>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  categoryDropdownButton: {
    borderWidth: 1,
    borderRadius: 4,
    width: '100%',
    height: 40
  },
})