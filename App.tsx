import 'react-native-gesture-handler';
import {TabNavigator} from "./src/navigation/TabNavigator";
import {Provider as PaperProvider} from "react-native-paper";
import {GlobalContextProvider} from "./src/contexts/GlobalContext/GlobalContextProvider";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {RootNavigator} from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <PaperProvider>
      <GlobalContextProvider>
        <NavigationContainer>
          <RootNavigator/>
        </NavigationContainer>
      </GlobalContextProvider>
    </PaperProvider>
  );
}

