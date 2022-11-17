import {Spacer} from "../../vanguard/Spacer/Spacer";
import {TimePeriod, TimePeriodSelector} from "../../common-components/TimePeriod/TimePeriodSelector";
import {TotalSpent} from "../../common-components/TotalSpent/TotalSpent";

interface Props {
    timePeriod: TimePeriod;
    onPeriodChange: (newPeriodTime: TimePeriod) => void;
    totalSpent: number;
}

export function ReportSummary(props: Props) {
    const {totalSpent, timePeriod, onPeriodChange} = props;
    return <>
        <Spacer height={16}/>
        <TimePeriodSelector
            timePeriod={timePeriod}
            onTimePeriodChange={onPeriodChange}/>

        <Spacer height={24}/>
        <TotalSpent
            timePeriod={timePeriod}
            totalSpent={totalSpent}
        />
    </>
}