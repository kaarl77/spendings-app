import {StyleSheet, View} from "react-native";
import {Text} from "../../vanguard/Text/Text";
import {Button, ButtonType} from "../../vanguard/Button/Button";

interface Props {
  text: string;
  onPress: () => void;
}

export function HeadingText(props: Props) {
  const {text, onPress} = props;
  return (
    <View style={styles.container}>
      <Text bold={true}>
        {text}
      </Text>
      <Button title={"See all"} buttonType={ButtonType.Default} onPress={onPress}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  }
})