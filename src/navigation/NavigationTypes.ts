import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TabStackParamList} from "./TabNavigator";

export type TabScreensNavigationProp<Screen extends keyof TabStackParamList> = NativeStackNavigationProp<TabStackParamList, Screen>;