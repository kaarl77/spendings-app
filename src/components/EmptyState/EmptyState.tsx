import {Text} from "../../vanguard/Text/Text";
import {Screen} from "../../common-components/Screen/Screen";
import React from "react";

export function EmptyState(){
    return(
        <Screen>
            <Text bold={true}>
                Transactions and categories loading...
            </Text>
        </Screen>
    )
}