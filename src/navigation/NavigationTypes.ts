import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type TabStackParamList = {
    Homepage: undefined;
    Transactions: undefined;
    AddEditTransaction: undefined;
};

export type ProfileScreenNavigationProp = NativeStackNavigationProp<TabStackParamList, 'Homepage'>;