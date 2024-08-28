import React from "react";
import { Text, View } from "react-native";
import CustomIcon from "../../components/customIcon";
import { FontFamily } from "../../utills/theme";



const HomeScreenComponent: React.FC = () => {
    return (
        <View>
            <Text style={{ fontFamily: FontFamily.ROBOTO_BOLD }} >This is text</Text>

        </View>
    )
}

export default HomeScreenComponent;