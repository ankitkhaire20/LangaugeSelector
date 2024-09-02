import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { themes, Theme, getSystemTheme, ThemeProperties } from './themeSelection'; // Adjust the import path
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    currentThemeProperties: ThemeProperties;
}


const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const THEME_KEY = 'userTheme';



export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [theme, setTheme] = useState<Theme>('system'); // Default to system theme
    const [currentThemeProperties, setCurrentThemeProperties] = useState<ThemeProperties>(getSystemTheme());


    useEffect(() => {
        // Load the theme from AsyncStorage when the app loads
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem(THEME_KEY);
            if (savedTheme) {
                setTheme(savedTheme as Theme);
            }
        };
        loadTheme();
    }, []);


    useEffect(() => {
        const handleColorSchemeChange = () => {
            const colorScheme = Appearance.getColorScheme();
            setCurrentThemeProperties(colorScheme === 'dark' ? themes.dark : themes.light);
        };

        if (theme === 'system') {
            // Update theme on color scheme change
            handleColorSchemeChange(); // Apply initial color scheme
            const subscription = Appearance.addChangeListener(() => {
                handleColorSchemeChange();
            });
            return () => subscription.remove();
        } else {
            setCurrentThemeProperties(themes[theme]);
        }
    }, [theme]);

    const handleSetTheme = async (theme: Theme) => {
        console.log("Thme--", theme);

        await AsyncStorage.setItem(THEME_KEY, theme); // Save theme to AsyncStorage
        setTheme(theme);
    };



    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme: handleSetTheme,
            currentThemeProperties
        }} >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
