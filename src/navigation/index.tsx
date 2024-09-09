import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./routes";
import HomeScreenContainer from "../screens/home/HomeScreenContainer";
import LoginScreenContainer from "../screens/AuthStack/Login/LoginScreenContainer";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import CustomIcon from "../components/customIcon";
import { Color, FontSize } from "../utills/theme";
import ProfileScreenContainer from "../screens/profile/ProfileScreenContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ListScreenContaner from "../screens/List/ListScreenContainer";

// Auth Stack Navigator
const Auth = createNativeStackNavigator();
export const AuthStack: React.FC = () => {
    return (
        <Auth.Navigator>
            <Auth.Screen
                name={'Login'}
                component={LoginScreenContainer}
                options={{ headerShown: false }}
            />
        </Auth.Navigator>
    );
};

// Home Stack Navigator
const Home = createNativeStackNavigator();
export const HomeStack: React.FC = () => {
    return (
        <Home.Navigator>
            <Home.Screen
                name="HomeScreen"
                component={HomeScreenContainer}
                options={{ headerShown: true }} // Show header for HomeScreen
            />
            <Home.Screen
                name="ListScreen"
                component={ListScreenContaner}
                options={{ headerShown: true }} // Show header for ListScreen
            />
        </Home.Navigator>
    );
};

// Profile Stack Navigator
const Profile = createNativeStackNavigator();
export const ProfileStack: React.FC = () => {
    return (
        <Profile.Navigator>
            <Profile.Screen
                name="ProfileScreen"
                component={ProfileScreenContainer}
            />
        </Profile.Navigator>
    );
};

// Tab Bar Navigation
const TabBar = createBottomTabNavigator();
export const TabBarNavigation: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <TabBar.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === Routes.Home) {
                        iconName = 'home';
                    }
                    else if (route.name === Routes.Profile) {
                        iconName = 'setting';
                    }
                    return (
                        <View>
                            <CustomIcon
                                name={iconName}
                                size={FontSize.SIZE_26}
                                color={focused ? 'red' : Color.TEXT_BLACK}
                            />
                        </View>
                    )
                },
                tabBarLabel: ({ focused }) => {
                    let label;
                    if (route.name === Routes.Home) {
                        label = 'Home';
                    } else if (route.name === Routes.Profile) {
                        label = 'Profile'
                    }
                    return (
                        <Text style={{
                            color: focused ? 'red' : Color.GRAY
                        }} >
                            {label}
                        </Text>
                    )
                },
                tabBarStyle: {
                    height: 55 + insets.bottom,
                }, // Apply custom tab bar styles here
            })}
        >
            <TabBar.Screen
                name={Routes.Home}
                options={{ headerShown: false }} // Hide header for tab bar
                component={HomeStack}
            />
            <TabBar.Screen
                name={Routes.Profile}
                options={{ headerShown: false }} // Hide header for tab bar
                component={ProfileStack}
            />
        </TabBar.Navigator>
    );
};

// Styles
const styles = StyleSheet.create({
    bottomTab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 103,
        height: 40,
        borderRadius: 50,
    },
    tabBar: {
        // paddingBottom: 5,
    },
    tabBarLabel: {
        fontSize: FontSize.SIZE_14,
        color: 'white',
    },
    tabBarLabelFocused: {
        fontWeight: 'bold',
        color: 'red', // Focused color for the label
    },
});
