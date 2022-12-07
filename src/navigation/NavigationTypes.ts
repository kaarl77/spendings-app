import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TabStackParamList} from "./TabNavigator";
import {RouteProp} from "@react-navigation/native";

export type TabScreensNavigationProp<Screen extends keyof TabStackParamList> = NativeStackNavigationProp<TabStackParamList, Screen>;
export type TabScreensRouteProp<Screen extends keyof TabStackParamList> = RouteProp<TabStackParamList, Screen>;
