// src/context/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export type theme = 'light' | 'dark' | 'system';

interface ThemeContextProps {
    theme: theme;
    setTheme: (theme: theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Create a custom hook to use the ThemeContext
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const systemTheme = useColorScheme(); // Detects the system theme (light or dark)
    console.log("systemThem--", systemTheme);

    const [theme, setTheme] = useState<theme>('system'); // Default to 'system'
    const [currentTheme, setCurrentTheme] = useState<theme>(systemTheme);

    // Update currentTheme when systemTheme or theme changes
    useEffect(() => {
        if (theme === 'system') {
            setCurrentTheme(systemTheme);
        } else {
            setCurrentTheme(theme);
        }
    }, [theme, systemTheme]);

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
