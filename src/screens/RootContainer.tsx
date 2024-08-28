import React from "react";
import { Text, View } from "react-native";
import { FontFamily } from "../utills/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "../navigation/routes";
import { AuthStack, TabBarNavigation } from "../navigation";
import { navigationRef } from "../navigation/RootNavigation";


const RootContainer: React.FC = () => {

    const BaseStack = createNativeStackNavigator();

    return (
        <NavigationContainer ref={navigationRef} >
            <BaseStack.Navigator>
                {/* <BaseStack.Screen name={Routes.Auth} component={AuthStack} /> */}
                <BaseStack.Screen name={Routes.Tab} component={TabBarNavigation}
                    options={{ headerShown: false }} />
            </BaseStack.Navigator>
        </NavigationContainer>
    )
}
export default RootContainer;