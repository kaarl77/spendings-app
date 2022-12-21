import 'react-native-gesture-handler';
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {RootNavigator} from "./src/navigation/RootNavigator";
import Toast from 'react-native-toast-message';
import {Provider} from "react-redux";
import {rootStore} from "./src/redux-stores/rootStore";


export default function App() {

  return (
    <PaperProvider theme={DefaultTheme}>
      <Provider store={rootStore}>
        <NavigationContainer>
          <RootNavigator/>
          <Toast/>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}

