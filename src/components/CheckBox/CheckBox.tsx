import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomIcon from "../customIcon";

interface CheckBoxProps {
    label: string,
    onPressItem: (item: object) => void;
    checked: boolean
}


const CheckBox: React.FC<CheckBoxProps> = (props) => {

    const { label, onPressItem, checked } = props

    return (
        <>

            <TouchableOpacity style={styles.ViewContainer}
                onPress={onPressItem}>
                <CustomIcon name={checked ? "checked" : "unchecked"}
                    size={30} />
                <Text style={styles.labelText} >{label}</Text>
            </TouchableOpacity >

        </>
    )
}

const styles = StyleSheet.create({
    ViewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    labelText: {
        fontSize: 24,
        padding: 10
    }
})

export default CheckBox;