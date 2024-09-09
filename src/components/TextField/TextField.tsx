import React, { forwardRef } from 'react';
import {
    NativeSyntheticEvent,
    ReturnKeyTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    TextInputSubmitEditingEventData,
    TouchableOpacity,
    View,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Color, FontFamily } from '../../utills/theme';
import CustomIcon from '../customIcon';

interface TextInputProps {
    label: string;
    leftIcon?: string;
    rightIcon?: string;
    mainTextInputStyle?: ViewStyle;
    onPressLeftIcon?: () => void;
    onPressRightIcon?: () => void;
    value: string;
    secureTextEntry: boolean;
    onChangetText: (text: string) => void;
    onSubmitEditing?: (
        e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
    ) => void;
    editable: boolean;
    returnKeyType?: ReturnKeyTypeOptions;
    errormessage?: string;
}

const TextField = React.forwardRef<TextInput, TextInputProps>((props, ref) => {
    const {
        label,
        leftIcon,
        value,
        returnKeyType,
        onChangetText,
        onSubmitEditing,
        editable,
        mainTextInputStyle,
        onPressLeftIcon,
        errormessage,
        onPressRightIcon,
        secureTextEntry,
        rightIcon,
    } = props;

    return (
        <View style={styles.container}>
            {label && <Text style={styles.labelText}>{label}</Text>}
            <View style={[styles.mainTextInputContainer, mainTextInputStyle]}>
                {leftIcon && onPressLeftIcon && (
                    <TouchableOpacity style={styles.leftIconStyle} onPress={onPressLeftIcon}>
                        <CustomIcon name={leftIcon} size={18} color={Color.PRIMARY} />
                    </TouchableOpacity>
                )}
                <TextInput
                    value={value}
                    ref={ref}
                    returnKeyType={returnKeyType}
                    onChangeText={onChangetText}
                    onSubmitEditing={onSubmitEditing}
                    style={[styles.textInput, {
                        paddingLeft: leftIcon != null ? 6 : 0
                    }]}
                    editable={editable}
                    secureTextEntry={secureTextEntry}
                />
                {rightIcon && value !== '' && (
                    <TouchableOpacity style={styles.rightIconStyle} onPress={onPressRightIcon}>
                        <CustomIcon name={rightIcon} size={18} color={Color.PRIMARY} />
                    </TouchableOpacity>
                )}
            </View>
            {errormessage && <Text style={styles.errorText}>{errormessage}</Text>}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '100%',
    },
    labelText: {
        fontSize: 18,
        fontFamily: FontFamily.ROBOTO_BOLD,
        color: Color.PRIMARY,
        marginBottom: 14,
    },
    mainTextInputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Color.PRIMARY,
        borderRadius: 10,
        height: 48,
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    leftIconStyle: {
        marginRight: 12,
    },
    rightIconStyle: {
        marginLeft: 12,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
    },
    errorText: {
        fontSize: 14,
        color: Color.RED,
        marginTop: 8,
    },
});

export default TextField;
