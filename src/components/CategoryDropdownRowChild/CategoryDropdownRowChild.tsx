import {StyleSheet, View} from "react-native";
import {Image} from "../../vanguard/Image/Image";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {FontSize, Text} from "../../vanguard/Text/Text";
import React, {useContext} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";
import {Spacings} from "../../theming/spacings/Spacings";

interface Props {
  categoryId: number;
}

export function CategoryDropdownRowChild(props: Props) {
  const {categoryId} = props;
  const {categories} = useContext(GlobalContext);
  return(
    <View style={styles.container}>
      <Spacer height={Spacings["--1x"]}/>
      <Image
        index={categoryId}
        width={20}
        height={20}/>
      <Spacer height={Spacings["--1x"]}/>

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
  },
})