import 'react-native-gesture-handler';
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {RootNavigator} from "./src/navigation/RootNavigator";
import Toast from 'react-native-toast-message';
import {Provider} from "react-redux";
import {rootStore} from "./src/redux-stores/rootStore";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import {EmptyState} from "./src/components/EmptyState/EmptyState";

const persistor = persistStore(rootStore);
export default function App() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <Provider store={rootStore}>
        <PersistGate loading={<EmptyState/>} persistor={persistor}>
          <NavigationContainer>
            <RootNavigator/>
            <Toast/>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}

