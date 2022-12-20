import {FontSize, Text} from "../../vanguard/Text/Text";
import {TimePeriod} from "../TimePeriod/TimePeriodSelector";
import {useSelector} from "react-redux";
import {RootState} from "../../redux-stores/rootStore";

interface Props {
  timePeriod: TimePeriod;
}

export function TotalSpent(props: Props) {
  const {timePeriod} = props;
  const {totalSpentInTimePeriod} = useSelector((state:RootState)=>state.homepage)

  return (
    <>
      <Text fontSize={FontSize.large}>{totalSpentInTimePeriod}</Text>
      <Text>Total spent this {getTimePeriodToString()}</Text>
    </>
  )

  function getTimePeriodToString(): String {
    return timePeriod === TimePeriod.week ? "week" : "month";
  }
}



