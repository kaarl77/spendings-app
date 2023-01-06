import {StyleSheet, View} from "react-native";
import {Image} from "../../vanguard/Image/Image";
import {FontSize, Text} from "../../vanguard/Text/Text";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux-stores/rootStore";
import {Spacings} from "../../theming/spacings/Spacings";

interface Props {
  categoryId: number;
}

export function CategoryDropdownRowChild(props: Props) {
  const {categoryId} = props;
  const {categories} = useSelector((state: RootState) => state.root)
  return (
    <View style={styles.container}>
      <Image
        index={categoryId}
        width={20}
        height={20}/>

      <Text
        fontSize={FontSize.medium}>
        {categories[categoryId].name}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: Spacings["--1x"],
  },
})