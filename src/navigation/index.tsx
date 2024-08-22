import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./routes";
import HomeScreenContainer from "../screens/home/HomeScreenContainer";

const Auth = createNativeStackNavigator();
export const AuthStack: React.FC = () => {


    return (
        <Auth.Navigator>
            <Auth.Screen
                name={Routes.Home}
                component={HomeScreenContainer}
                options={{ headerShown: false, }}
            />
        </Auth.Navigator>
    );
};