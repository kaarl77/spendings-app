import {StyleSheet, View} from "react-native";
import {Category} from "../../custom-types/Category";
import {Image} from "../../vanguard/Image/Image";
import {Text} from "../../vanguard/Text/Text";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {Spacings} from "../../theming/spacings/Spacings";
import React from "react";

interface Props {
  category: Category;
  disabled: boolean;
  categoryId: number;
}

export function CategoryDropdownButtonChild(props: Props) {
  const {categoryId, category} = props;
  return (
    <View>
      {(category && categoryId >= 0) ? (
          <View style={styles.content}>
            <Image index={categoryId} width={20} height={20}/>
            <Spacer width={Spacings["--1x"]}/>

            <Text>{(category as Category).name}</Text>
          </View>
        )
        : <Text>Select category</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
  },
})