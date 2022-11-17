import {Text as TextBase, TextStyle, ViewStyle} from "react-native";
import {ReactNode} from "react";

export enum FontSize{
    small=12,
    medium=16,
    large=24,
    extraLarge=32,
}

interface Props {
    styleProp?:Omit<TextStyle, "color" | "fontSize"> ;
    children: ReactNode;
    color?: string;
    fontSize?: FontSize;
}


export function Text(props:Props){
    const {styleProp,children,color, fontSize} = props;

    const defaultColor = "black";
    const defaultFontSize:FontSize = FontSize.medium;

    const style:TextStyle = {
        color:color || defaultColor,
        fontSize: fontSize || defaultFontSize,
        ...styleProp,
    }

    return <TextBase style={style}>
        {children}
    </TextBase>
}