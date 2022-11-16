import { NavigationContainer } from '@react-navigation/native';
import {Homepage} from "../components/Homepage/Homepage";
import {Transactions} from "../components/Transactions/Transactions";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TabStackParamList} from "./NavigationTypes";

export function TabNavigator(){
    const Tab = createBottomTabNavigator<TabStackParamList>();
    return(
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name = "Homepage" component={Homepage} options={{headerShown:false}}/>
            <Tab.Screen name = "Transactions" component={Transactions}/>
        </Tab.Navigator>
    </NavigationContainer>)
}