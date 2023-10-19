import { StyleSheet, View } from "react-native";
import { FontSize, Text } from "../../vanguard/Text/Text";
import { Moment } from "moment/moment";
import { Spacer } from "../../vanguard/Spacer/Spacer";
import { StringToDate } from "../../utils/date-utils";
import { useVanguardTheme } from "../../theming/colors/useVanguardTheme";
import { Spacings } from "../../theming/spacings/Spacings";
import React from "react";

interface Props {
  dateString: string;
  value: number;
}

export function DayHeader(props: Props) {
  const { dateString, value } = props;
  const date = StringToDate(dateString, "YYYY-MM-DD");
  const { PaletteNeutral, PalettePrimary } = useVanguardTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headerDate}>
        <Text
          bold={true}
          fontSize={FontSize.extraLarge}
          styleProp={styles.date}
          lineHeight={40}
        >
          {date.date()}
        </Text>
        <Spacer width={Spacings["--1x"]} />
        <View>
          <Text bold={true} fontSize={FontSize.small} lineHeight={16}>
            {getDateAsString(date)}
          </Text>

          <Text
            fontSize={FontSize.small}
            color={PaletteNeutral["800"]}
            lineHeight={16}
          >
            {date.format("MMMM YYYY")}
          </Text>
        </View>
      </View>

      <View>
        <Text color={PalettePrimary["1000"]} lineHeight={24}>
          {value}
        </Text>
      </View>
    </View>
  );

  function getDateAsString(date: Moment) {
    if (date.isSame(new Date(), "day")) {
      return "Today";
    } else if (date.add(1, "day").isSame(new Date(), "day")) {
      return "Yesterday";
    } else {
      return date.format("dddd");
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  date: {},
  headerDate: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});
