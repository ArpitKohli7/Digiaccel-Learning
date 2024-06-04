import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EnterEmail from "../Screens/EnterEmail";
import Library from "../Screens/Library";
import VideoScreen from "../Screens/VideoScreen";
import LearningScreen from "../Screens/LearningScreen";
const Stack = createStackNavigator();

const MainStacks = () => (
    <Stack.Navigator
        initialRouteName="EnterEmail"
        screenOptions={{
            gestureEnabled: false,
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#F2F2F7',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
        <Stack.Screen
            name="EnterEmail"
            component={EnterEmail}
            options={{
                title: undefined,
                headerShown: false,
            }} />
        <Stack.Screen
            name="Library"
            component={Library}
            options={{
                title: undefined,
                headerShown: false,
            }} />
             <Stack.Screen
            name="VideoScreen"
            component={VideoScreen}
            options={{
                title: undefined,
                headerShown: false,
            }} />
             <Stack.Screen
            name="LearningScreen"
            component={LearningScreen}
            options={{
                title: undefined,
                headerShown: false,
            }} />
    </Stack.Navigator>
)

export default MainStacks;