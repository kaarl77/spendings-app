import {StyleSheet, View} from "react-native";
import {Image} from "../../vanguard/Image/Image";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {FontSize, Text} from "../../vanguard/Text/Text";
import {useContext} from "react";
import {GlobalContext} from "../../contexts/GlobalContext/GlobalContextProvider";

interface Props {
  categoryId: number;
}

export function CategoryDropdownRowChild(props: Props) {
  const {categoryId} = props;
  const {categories} = useContext(GlobalContext);
  return(
    <View style={styles.container}>
      <Spacer width={8}/>
      <Image
        index={categoryId}
        width={20}
        height={20}/>
      <Spacer width={8}/>

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