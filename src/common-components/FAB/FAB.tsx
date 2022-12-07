import {Pressable, StyleSheet} from "react-native";
import {FontSize, Text} from "../../vanguard/Text/Text";
import {useVanguardTheme} from "../../colors/useVanguardTheme";

interface Props {
  onPress?: () => void;
  title: string
}

export function FAB(props: Props) {
  const {title, onPress} = props;
  const {PalettePrimary} = useVanguardTheme();
  const containerStyle = {
    backgroundColor: PalettePrimary["600"],
    ...styles.container
  };

  return (
    <Pressable
      style={containerStyle}
      onPress={onPress}>
      <Text color={PalettePrimary["100"]} fontSize={FontSize.large}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 500,
    position: "absolute",
    bottom: 24,
    right: 24,
    height: 60,
    width: 60,
  },
})