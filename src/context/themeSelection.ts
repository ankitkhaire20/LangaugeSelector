import { Appearance } from 'react-native';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeProperties {
    backgroundColor: string;
    textColor: string;
}

const lightTheme: ThemeProperties = {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
};

const darkTheme: ThemeProperties = {
    backgroundColor: '#000000',
    textColor: '#000000',
};

// Function to get the theme based on the system's color scheme
export const getSystemTheme = (): ThemeProperties => {
    const colorScheme = Appearance.getColorScheme();
    return colorScheme === 'dark' ? darkTheme : lightTheme;
};

// Export themes as a record with keys matching theme names
export const themes: Record<Theme, ThemeProperties> = {
    light: lightTheme,
    dark: darkTheme,
    system: getSystemTheme(), // Default to system theme
};
