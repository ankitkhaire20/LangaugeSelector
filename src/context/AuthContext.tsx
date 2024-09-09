import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
    userDetails: object | null;
    setUser: (userDetails: object | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userDetails, setUser] = useState<object | null>(null);



    useEffect(() => {
        const loadUser = async () => {
            try {
                const user = await AsyncStorage.getItem('userDetails');
                if (user) {
                    setUser(JSON.parse(user));
                }
            } catch (error) {
                console.error('Failed to load user from storage', error);
            }
        };

        loadUser();
    }, []);

    const handleSetUser = async (userDetails: object | null) => {
        try {
            if (userDetails) {
                await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails));
            } else {
                await AsyncStorage.removeItem('userDetails');
            }
            setUser(userDetails);
        } catch (error) {
            console.error('Failed to save user to storage', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userDetails');
            setUser(null);
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    return (
        <AuthContext.Provider value={{ userDetails, setUser: handleSetUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;