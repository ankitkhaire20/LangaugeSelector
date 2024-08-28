// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Define theme types
type ThemeType = 'light' | 'dark' | 'system';

// Define context properties
interface ThemeContextProps {
    theme: ThemeType; // User-selected theme
    currentTheme: 'light' | 'dark'; // The theme currently being applied
    setTheme: (theme: ThemeType) => void;
}

// Create Theme Context
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Custom hook to use the ThemeContext
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// ThemeProvider component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const systemTheme = useColorScheme(); // Detect system theme
    const [theme, setTheme] = useState<ThemeType>('system'); // Default theme is 'system'
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(systemTheme ?? 'light');

    // Update current theme whenever the user-selected or system theme changes
    useEffect(() => {
        // If the theme is set to 'system', follow the system theme
        if (theme === 'system') {
            setCurrentTheme(systemTheme ?? 'light');
        } else {
            setCurrentTheme(theme);
        }
    }, [theme, systemTheme]);

    return (
        <ThemeContext.Provider value={{ theme, currentTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
