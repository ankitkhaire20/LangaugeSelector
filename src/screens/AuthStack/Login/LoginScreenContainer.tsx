import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import LoginScreenComponent from './LoginScreenComponent';
import useAuth from '../../../components/hooks/useAuth';


const MyComponent = () => {

    const { userDetails, logout, setUser } = useAuth();


    useEffect(() => {
        // getFetchData();
    }, []);






    return (
        <View style={styles.container}>
            <LoginScreenComponent
                onPressSubmit={function (data: any): void {
                    console.log("data---", data);
                    setUser(data)
                }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MyComponent;
