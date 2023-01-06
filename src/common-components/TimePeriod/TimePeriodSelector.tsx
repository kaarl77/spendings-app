import {StyleSheet, View} from "react-native";
import {Button, ButtonType} from "../../vanguard/Button/Button";
import {Spacer} from "../../vanguard/Spacer/Spacer";
import React, {useState} from "react";
import {Spacings} from "../../theming/spacings/Spacings";

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
  const [buttonWidth, setButtonWidth] = useState(0);

  const style = {
    ...styles.container,
  }

  return (
    <View
      style={style}
      onLayout={(event) => {
        let {width} = event.nativeEvent.layout;
        setButtonWidth(Math.floor((width - 16) / 2));
      }}>
      <View style={{flex: 1}}>
        <Button
          title={"Week"}
          onPress={() => {
            onTimePeriodChange(TimePeriod.week)
          }}
          buttonType={getWeekButtonType()}
        />
      </View>

      <Spacer height={Spacings["--2x"]}/>

      <View style={{flex: 1}}>
        <Button
          title={"Month"}
          onPress={() => {
            onTimePeriodChange(TimePeriod.month)
          }}
          buttonType={getMonthButtonType()}
        />
      </View>
    </View>
  )

  function getWeekButtonType() {
    return timePeriod === TimePeriod.week ? ButtonType.Primary : ButtonType.Secondary;
  }

  function getMonthButtonType() {
    return timePeriod === TimePeriod.month ? ButtonType.Primary : ButtonType.Secondary;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  }
})