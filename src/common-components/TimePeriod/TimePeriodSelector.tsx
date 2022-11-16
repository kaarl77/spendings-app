import {StyleSheet, View} from "react-native";
import {Button, ButtonType} from "../../vanguard/Button";

// export type TimePeriodSelector = {
//
// }

export enum TimePeriod {
    week = "timePeriodWeek",
    month = "timePeriodMonth",
}

interface Props {
    timePeriod: TimePeriod;
    onTimePeriodChange: (timePeriod: TimePeriod) => void;
}

export function TimePeriodSelector(props: Props) {
    const {timePeriod, onTimePeriodChange} = props;

    function getWeekButtonType() {
        return timePeriod === TimePeriod.week ? ButtonType.Primary : ButtonType.Secondary;
    }
    function getMonthButtonType() {
        return timePeriod === TimePeriod.month ? ButtonType.Primary : ButtonType.Secondary;
    }
        return (
        <View style={styles.TimeButtons}>
            <Button
                title={"Week"}
                onPress={() => {
                    onTimePeriodChange(TimePeriod.week)
                }}
                buttonType={getWeekButtonType()}
            />
            <Button
                title={"Month"}
                onPress={() => {
                    onTimePeriodChange(TimePeriod.month)
                }}
                buttonType={getMonthButtonType()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    TimeButtons: {
        //flex: 1,
        flexDirection: 'row',
        //alignItems: 'flex-start',
        justifyContent: 'center'
    }
})