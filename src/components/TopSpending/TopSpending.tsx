import {Pressable, StyleSheet, View} from "react-native";
import {Text} from "../../vanguard/Text/Text";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {Image} from "../../vanguard/Image/Image";
import {useVanguardTheme} from "../../theming/colors/useVanguardTheme";
import {Spacings} from "../../theming/spacings/Spacings";
import React from "react";

interface Props {
  categoryName: string;
  categoryID: number;
  value: number;
  percentage: number;
  onPress: () => void;
}

export function TopSpending(props: Props) {
  const {categoryName, value, percentage, categoryID, onPress} = props;

  const {PaletteNeutral} = useVanguardTheme();
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
        <Spacer width={Spacings["--2x"]}/>

        <View style={{flex: 1, flexDirection: "row"}}>
          <View style={styles.textContainer}>
            <Text bold={true}>
              {categoryName}
            </Text>
            <Text>
              {value}
            </Text>
          </View>

          <Spacer width={Spacings["--1x"]}/>
          <Text> {percentage}% </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({

  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
    gap: 16,
  },
  textContainer: {
    flex: 1,
  }
})