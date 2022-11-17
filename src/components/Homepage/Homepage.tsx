import {Screen} from "../../common-components/Screen/Screen";
import {FontSize, Text} from "../../vanguard/Text/Text";
import {Button, ButtonType} from "../../vanguard/Button/Button";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {TimePeriod, TimePeriodSelector} from "../../common-components/TimePeriod/TimePeriodSelector";
import {TotalSpent} from "../../common-components/TotalSpent/TotalSpent";
import {useEffect, useState} from "react";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import {ReportSummary} from "../ReportSummary/ReportSummary";



export function Homepage() {
    const [timePeriod, setTimePeriod] = useState(TimePeriod.week);
    const [totalSpent, setTotalSpent] = useState(0);

    const onPeriodChange = (timePeriod:TimePeriod) =>{
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
                totalSpent={totalSpent}
            />
        </Screen>
    )
}


