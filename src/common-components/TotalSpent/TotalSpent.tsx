import {View} from "react-native";
import {FontSize, Text} from "../../vanguard/Text/Text";
import {TimePeriod} from "../TimePeriod/TimePeriodSelector";

interface Props {
    timePeriod: TimePeriod;
    totalSpent: number
}

export function TotalSpent(props:Props) {
    const {timePeriod, totalSpent} = props;

    return(
        <View>
            <Text fontSize={FontSize.large}>{totalSpent}</Text>
            <Text>Total spent this {getTimePeriodToString(timePeriod)}</Text>
        </View>
    )
}

function getTimePeriodToString(timePeriod: TimePeriod):String {
    return timePeriod===TimePeriod.week ? "week" : "month";
}

