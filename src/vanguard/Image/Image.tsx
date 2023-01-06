import {Image as ImageBase} from "react-native";

interface Props {
  index: number;
  width: number;
  height: number;
}

const imageSources = [
  require("../../../assets/subscription.png"),
  require("../../../assets/restaurant.png"),
  require("../../../assets/transport.png"),
  require("../../../assets/personal.png"),
]

export function Image(props: Props) {
  const {index, width, height} = props;

  return (
    <ImageBase
      source={imageSources[index]}
      style={{width: width, height: height}}
    />)
}