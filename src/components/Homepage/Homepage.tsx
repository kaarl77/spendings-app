import {Screen} from "../../common-components/Screen/Screen";
import {TimePeriod} from "../../common-components/TimePeriod/TimePeriodSelector";
import {useState} from "react";
import {ReportSummary} from "../ReportSummary/ReportSummary";
import {Transaction} from "../../custom-types/Transaction";
import {Category} from "../../custom-types/Category";
import {StyleSheet} from "react-native";

export function Homepage() {
    const [timePeriod, setTimePeriod] = useState(TimePeriod.week);

    const transactions: Transaction[] = [
        {
            id: 0,
            value: 125.15,
            date: "17-11-2022",
            categoryId: 3,
            note: "Bought Gucci from piata",
        },
        {
            id: 1,
            value: 30.20,
            date: "16-11-2022",
            categoryId: 1,
            note: "Ate pasta at the mall",
        },
        {
            id: 2,
            value: 599.99,
            date: "17-11-2022",
            categoryId: 3,
            note: "bought wide camera lens for mom",
        },
        {
            id: 3,
            value: 1722.5,
            date: "01-11-2022",
            categoryId: 0,
            note: "Paid rent",
        },
        {
            id: 4,
            value: 10.78,
            date: "14-11-2022",
            categoryId: 2,
            note: "Uber to uni",
        },
        {
            id: 5,
            value: 159.9,
            date: "01-10-2022",
            categoryId: 0,
            note: "gym membership",
        },
        {
            id: 6,
            value: 170.0,
            date: "24-10-2022",
            categoryId: 0,
            note: "Paid utilities",
        },
    ];

    const categories: Category[] = [
        {
            id: 3,
            name: "useless stuff",
            icon: "icon",
        },
        {
            id: 1,
            name: "restaurant",
            icon: "restaurant",
        },
        {
            id: 2,
            name: "transport",
            icon: "transport",
        },
        {
            id: 0,
            name: "rent/subscriptions",
            icon: "rent",
        },
    ]
    const onPeriodChange = (timePeriod: TimePeriod) => {
        setTimePeriod(timePeriod);
    }

    // useEffect(() => {
    //     console.log(timePeriod);
    // },[timePeriod]);

    return (
        <Screen>
            <ReportSummary
                timePeriod={timePeriod}
                onPeriodChange={onPeriodChange}
                transactions={transactions}
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    reportSummary: {
        flex: 1,
        backgroundColor: "#EEEEEE",
    },
})

