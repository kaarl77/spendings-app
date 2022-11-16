import {Spacer} from "../../vanguard/Spacer";
import {TimePeriod, TimePeriodSelector} from "../../common-components/TimePeriod/TimePeriodSelector";
import {TotalSpent} from "../../common-components/TotalSpent/TotalSpent";

interface Props {
    timePeriod: TimePeriod;
    onPeriodChange: () => void;
    totalSpent: number;
}

export function ReportSummary(props: Props) {
    const {timePeriod, onPeriodChange, totalSpent} = props
    return (
        <>
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
        </>
    )
}