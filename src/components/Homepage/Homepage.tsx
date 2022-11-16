import {Screen} from "../../common-components/Screen/Screen";
import {FontSize, Text} from "../../vanguard/Text";
import {Button, ButtonType} from "../../vanguard/Button";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {TimePeriod, TimePeriodSelector} from "../../common-components/TimePeriod/TimePeriodSelector";
import {TotalSpent} from "../../common-components/TotalSpent/TotalSpent";
import {useEffect, useState} from "react";
import {Spacer} from "../../vanguard/Spacer";



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
            {/*
            Buttons for Week or Month selection
            */}
            <Spacer height={16}/>
            <TimePeriodSelector
                timePeriod={timePeriod}
                onTimePeriodChange={onPeriodChange}
                />

            {/*
            Total money spent
            */}

            <Spacer height={24}/>
            <TotalSpent
                timePeriod={timePeriod}
                totalSpent={totalSpent}
            />
        </Screen>
    )
}


