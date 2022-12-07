import 'react-native-gesture-handler';
import {Provider as PaperProvider} from "react-native-paper";
import {GlobalContextProvider} from "./src/contexts/GlobalContext/GlobalContextProvider";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {RootNavigator} from "./src/navigation/RootNavigator";
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <PaperProvider>
      <GlobalContextProvider>
        <NavigationContainer>
          <RootNavigator/>
          <Toast/>
        </NavigationContainer>
      </GlobalContextProvider>
    </PaperProvider>
  );
}

