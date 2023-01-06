import {Text} from "../../vanguard/Text/Text";
import {Screen} from "../../common-components/Screen/Screen";
import React from "react";

export function LoadingState() {
  return (
    <Screen>
      <Text bold={true}>
        Your transactions are loading.
      </Text>
    </Screen>
  )
}