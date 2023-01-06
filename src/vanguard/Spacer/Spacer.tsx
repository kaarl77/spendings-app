import {View} from "react-native";

interface Props {
  width?: number,
  height?: number,
  forceColor?: string,
}

export function Spacer(props: Props) {
  const {width, height, forceColor = "transparent"} = props;
  return <View style={{width: width, height: height, backgroundColor: forceColor}}/>
}