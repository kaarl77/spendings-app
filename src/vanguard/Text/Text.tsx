import {Text as TextBase, TextStyle} from "react-native";
import {ReactNode} from "react";

export enum FontSize {
  small = 12,
  medium = 16,
  mediumLarge = 18,
  large = 24,
  extraLarge = 32,
}

interface Props {
  styleProp?: Omit<TextStyle, "color" | "fontSize">;
  children: ReactNode;
  color?: string;
  fontSize?: FontSize;
  bold?: boolean;
  lineHeight?: number
}


export function Text(props: Props) {
  const {styleProp, children, color, fontSize, bold = false, lineHeight} = props;
  const defaultColor = "black";
  const defaultFontSize: FontSize = FontSize.medium;

  const style: TextStyle = {
    color: color || defaultColor,
    fontSize: fontSize || defaultFontSize,
    lineHeight: lineHeight,
    fontWeight: bold ? "bold" : "normal",
    ...styleProp,
  }

  return <TextBase style={style}>
    {children}
  </TextBase>
}