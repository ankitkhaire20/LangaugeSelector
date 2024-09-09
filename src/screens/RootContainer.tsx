import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "../navigation/routes";
import { AuthStack, TabBarNavigation } from "../navigation";
import { navigationRef } from "../navigation/RootNavigation";
import useAuth from "../components/hooks/useAuth";
import Toast from "react-native-toast-message";

const RootContainer: React.FC = () => {
    const BaseStack = createNativeStackNavigator();
    const { userDetails } = useAuth();


    // Handle the case where userDetails might be null or undefined
    const isAuthenticated = userDetails && Object.keys(userDetails).length > 0;

    return (
        <>
            <NavigationContainer ref={navigationRef}>
                <BaseStack.Navigator>
                    {isAuthenticated ? (
                        <BaseStack.Screen
                            name={Routes.Tab}
                            component={TabBarNavigation}
                            options={{ headerShown: false }}
                        />
                    ) : (
                        <BaseStack.Screen
                            name={Routes.Auth}
                            component={AuthStack}
                        />
                    )}
                </BaseStack.Navigator>
            </NavigationContainer>
            <Toast />
        </>
    );
};

export default RootContainer;
