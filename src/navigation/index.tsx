import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./routes";
import HomeScreenContainer from "../screens/home/HomeScreenContainer";
import LoginScreenContainer from "../screens/AuthStack/Login/LoginScreenContainer";

const Auth = createNativeStackNavigator();
export const AuthStack: React.FC = () => {


    return (
        <Auth.Navigator>
            <Auth.Screen
                name={Routes.Login}
                component={LoginScreenContainer}
                options={{ headerShown: false, }}
            />
        </Auth.Navigator>
    );
};