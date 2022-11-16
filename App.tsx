import {StyleSheet, Text, View} from 'react-native';
import {TabNavigator} from "./src/navigation/TabNavigator";
import {Provider as PaperProvider} from "react-native-paper";

export default function App() {
    return (
        <PaperProvider>
            <TabNavigator/>
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
