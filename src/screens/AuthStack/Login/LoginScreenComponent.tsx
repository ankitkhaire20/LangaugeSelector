import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import TextField from '../../../components/TextField/TextField';
import { Color } from '../../../utills/theme';
import { REGEX } from '../../../utills/globals';
import CustomButton from '../../../components/customButton';

interface LoginScreenComponentProps {
    onPressSubmit: (data: any) => void;
}

const LoginScreenComponent: React.FC<LoginScreenComponentProps> = (props) => {

    const { onPressSubmit } = props;

    const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: 'all' });
    const lastnameRef = useRef<TextInput>(null);


    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name="Firstname"
                rules={{
                    required: {
                        value: true,
                        message: 'First Name is required',
                    },
                    pattern: {
                        value: REGEX.NAME,
                        message: 'Please enter a valid alphabetical name',
                    },
                }}
                render={({ field: { onChange, value } }) => (
                    <TextField
                        label="First Name:"
                        // leftIcon={value ? 'close' : undefined}
                        rightIcon={value ? 'close' : undefined}
                        onPressLeftIcon={() => {
                        }}
                        onPressRightIcon={() => {
                            reset({ Firstname: '' });
                        }}
                        returnKeyType={'next'}

                        value={value}
                        onChangetText={onChange}
                        editable={true}
                        errormessage={errors.Firstname?.message || ''}
                        secureTextEntry={false}
                        onSubmitEditing={() => lastnameRef.current?.focus()} // Focus on last name field
                    />
                )}
            />

            <Controller
                control={control}
                name="lastName"
                rules={{
                    required: {
                        value: true,
                        message: 'Last Name is required',
                    },
                    pattern: {
                        value: REGEX.NAME,
                        message: 'Please enter a valid alphabetical name',
                    },
                }}
                render={({ field: { onChange, value } }) => (
                    <TextField
                        label="Last Name:"
                        secureTextEntry={false}
                        value={value}
                        ref={lastnameRef} // Attach ref to last name TextField
                        onChangetText={onChange}
                        editable={true}
                        errormessage={errors.lastName?.message || ''}
                        returnKeyType="done"
                    />
                )}
            />

            <View style={{ marginTop: 30, }} >
                <CustomButton
                    onPress={handleSubmit(onPressSubmit)}
                    title={'Login'}
                    disabled={!isValid}

                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 100,
        flex: 1,
        width: '100%'
    },
    textStyle: {
        fontSize: 18,
    },
    buttonStyle: {
        borderWidth: 1,
        borderRadius: 10,
        width: 100,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
});

export default LoginScreenComponent;
