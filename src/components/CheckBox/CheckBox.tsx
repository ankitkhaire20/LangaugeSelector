import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface CheckBoxProps {
    checked: boolean;
    onToggle: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onToggle }) => {
    return (
        <TouchableWithoutFeedback onPress={onToggle}>
            <View style={styles.checkBoxContainer}>
                <View style={[styles.checkBox, checked && styles.checkBoxChecked]}>
                    {checked && <Text style={styles.checkMark}>✔</Text>}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    checkBoxContainer: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    checkBoxChecked: {
        backgroundColor: 'black',
    },
    checkMark: {
        color: 'white',
        fontSize: 16,
    },
});

export default CheckBox;
