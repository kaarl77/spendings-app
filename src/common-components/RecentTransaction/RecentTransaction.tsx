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
  date: string;
  value: number;
  onPress: () => void;
}

export function RecentTransaction(props: Props) {
  const {categoryID, categoryName, date, value, onPress} = props;

  const {PaletteNeutral} = useVanguardTheme();

  const containerStyle = {
    backgroundColor: PaletteNeutral["100"],
    ...styles.container
  };

  return (
    <Pressable onPress={onPress}>
      <View style={containerStyle}>
        <Image
          index={categoryID}
          width={40}
          height={40}/>
        <Spacer width={Spacings["--1x"]}/>

        <View style={styles.textContainer}>
          <Text bold={true}>{categoryName}</Text>
          <Text fontSize={FontSize.small}>{date}</Text>
        </View>
        <Spacer width={Spacings["--1x"]}/>

        <Text styleProp={styles.price}>{value}</Text>

      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  price: {
    padding: 16,
  }
})