import {Image as ImageBase} from "react-native";

export enum ImageSource {
  Transport = "transport.png",
  Subscription = "subscription.png",
  Personal = "personal.png",
  Restaurant = "restaurant.png",
}

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
  //const link = "../../../assets/" + source;

  return <ImageBase
    source={imageSources[index]}
    style={{width: width, height: height}}
  />
}