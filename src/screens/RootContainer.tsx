import React from "react";
import { Text, View } from "react-native";
import { FontFamily } from "../utills/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "../navigation/routes";
import { AuthStack } from "../navigation";


const RootContainer: React.FC = () => {

    const BaseStack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <BaseStack.Navigator>
                <BaseStack.Screen name={Routes.Auth} component={AuthStack} />
            </BaseStack.Navigator>
        </NavigationContainer>
    )
}
export default RootContainer;