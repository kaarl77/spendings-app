import {StyleSheet, Text, View} from 'react-native';
import {TabNavigator} from "./src/navigation/TabNavigator";
import {Provider as PaperProvider} from "react-native-paper";
import {GlobalContextProvider} from "./src/contexts/GlobalContext/GlobalContextProvider";

export default function App() {
    return (
        <PaperProvider>
            <GlobalContextProvider>
                <TabNavigator/>
            </GlobalContextProvider>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
