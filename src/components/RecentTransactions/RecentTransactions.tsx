import {useNavigation} from "@react-navigation/native";
import {TabScreensNavigationProp} from "../../navigation/NavigationTypes";
import {HeadingText} from "../../common-components/HeadingText/HeadingText";
import {View} from "react-native";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {RecentTransactionList} from "../../common-components/RecentTransactionList/RecentTransactionList";
import {Transaction} from "../../custom-types/Transaction";
import {StringToDate} from "../../utils/date-utils";
import {Category} from "../../custom-types/Category";

interface Props {
    transactions: Transaction[];
    categories: Category[];
}

export function RecentTransactions(props: Props) {
    const {transactions, categories} = props;

    const navigation = useNavigation<TabScreensNavigationProp<"Homepage">>();

    const Latest5Transactions:Transaction[] = get5LatestTransactions();

    return (
        <View>
            <HeadingText
                text={"Recent transactions"}
                onPress={() => {
                    navigation.navigate("Transactions")
                }}
            />
            <Spacer height={8}/>

            <RecentTransactionList transactions={Latest5Transactions} categories={categories}/>

        </View>);

    function get5LatestTransactions() {
        return (transactions.sort((a, b) => StringToDate(a.date).valueOf() < StringToDate(b.date).valueOf() ? 1 : -1).slice(0,5));
    }
}