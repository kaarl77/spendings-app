import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type TabStackParamList = {
    Homepage: undefined;
    Transactions: undefined;
    AddEditTransaction: undefined;
};

export type TabScreensNavigationProp<Screen extends keyof TabStackParamList> = NativeStackNavigationProp<TabStackParamList, Screen>;