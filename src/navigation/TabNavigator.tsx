import {NavigationContainer} from '@react-navigation/native';
import {Homepage} from "../components/Homepage/Homepage";
import {Transactions} from "../components/Transactions/Transactions";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TabStackParamList} from "./NavigationTypes";
import {Image} from "react-native";

export function TabNavigator() {
    const Tab = createBottomTabNavigator<TabStackParamList>();
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#4940CB",
                    tabBarInactiveTintColor: "#6A6A6A"
                }}>
                <Tab.Screen name="Homepage" component={Homepage} options={{headerShown: false}}/>
                <Tab.Screen name="Transactions" component={Transactions}/>
            </Tab.Navigator>
        </NavigationContainer>)
}