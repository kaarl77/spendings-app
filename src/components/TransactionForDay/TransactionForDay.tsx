import {Pressable, StyleSheet, View} from "react-native";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {FontSize, Text} from "../../vanguard/Text/Text";
import {Image} from "../../vanguard/Image/Image";
import {useVanguardTheme} from "../../theming/colors/useVanguardTheme";
import {Spacings} from "../../theming/spacings/Spacings";
import React from "react";

interface Props {
  categoryName: string;
  categoryID: number;
  note: string;
  value: number;
  onPress: () => void;
}

export function TransactionForDay(props: Props) {
  const {categoryID, categoryName, note, value, onPress} = props;

  const {PaletteNeutral, PalettePrimary} = useVanguardTheme();
  const containerStyle = {
    backgroundColor: PaletteNeutral["100"],
    ...styles.container
  };
  return (
    <Pressable onPress={onPress} style={containerStyle}>
      <View style={containerStyle}>
        <Image
          index={categoryID}
          width={40}
          height={40}/>
        <Spacer width={Spacings["--1x"]}/>

        <View style={{flex: 1, borderRadius: 4}}>
          <Text bold={true} color={PalettePrimary["900"]}>
            {categoryName}
          </Text>
          <Text fontSize={FontSize.small}>
            {note}
          </Text>
        </View>

        <View style={{height: "100%"}}>
          <Text color={PalettePrimary["1000"]}>{value}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    padding: 8,
    borderRadius: 4,
  },
})