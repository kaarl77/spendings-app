import {TabNavigator} from "./src/navigation/TabNavigator";
import {Provider as PaperProvider} from "react-native-paper";
import {GlobalContextProvider} from "./src/contexts/GlobalContext/GlobalContextProvider";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  return (
    <PaperProvider>
      <GlobalContextProvider>
        <NavigationContainer>
          <TabNavigator/>

        </NavigationContainer>
      </GlobalContextProvider>
    </PaperProvider>
  );
}

