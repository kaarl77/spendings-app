import {View} from "react-native";
import {Spacings} from "../../theming/spacings/Spacings";

interface Props {
  width?: Spacings,
  height?: Spacings,
  forceColor?: string,
}

export function Spacer(props: Props) {
  const {width, height, forceColor = "transparent"} = props;
  return <View style={{width: width, height: height, backgroundColor: forceColor}}/>
}