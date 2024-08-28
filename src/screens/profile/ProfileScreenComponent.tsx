import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styles from "./styles";
import CheckBox from "../../components/CheckBox/CheckBox";
import CustomIcon from "../../components/customIcon";

import { theme as ThemeType, useTheme } from "../../context/ThemeProviders";


interface ProfileScreenComponentProps {
    isEnabled: boolean;
    toggleSwitch: () => void;
}

interface ThemeOption {
    index: number;
    theme: ThemeType; // Ensure this matches the 'theme' type defined in your context
    checked: boolean;
}



// ProfileScreenComponent.tsx

const ProfileScreenComponent: React.FC<ProfileScreenComponentProps> = ({ isEnabled, toggleSwitch }) => {
    const { theme, currentTheme, setTheme } = useTheme(); // Extract both theme and currentTheme
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const initialThemes: ThemeOption[] = [
        { index: 0, theme: 'system', checked: theme === 'system' },
        { index: 1, theme: 'light', checked: theme === 'light' },
        { index: 2, theme: 'dark', checked: theme === 'dark' },
    ];

    const [themes, setThemes] = useState<ThemeOption[]>(initialThemes);

    useEffect(() => {
        // Update the checked state of the options based on the selected theme
        setThemes((prevThemes) =>
            prevThemes.map((themeOption) => ({
                ...themeOption,
                checked: themeOption.theme === theme,
            }))
        );
    }, [theme]);

    const handleThemeSelect = (index: number) => {
        const updatedThemes = themes.map((themeOption) => ({
            ...themeOption,
            checked: themeOption.index === index,
        }));

        const selectedTheme = updatedThemes.find((item) => item.checked)?.theme;
        console.log("selectedTheme---", selectedTheme);

        setTheme(selectedTheme as ThemeType);
        bottomSheetRef.current?.close();
        setThemes(updatedThemes);
    };

    const containerStyle: ViewStyle = {
        ...styles.container,
        backgroundColor: currentTheme === 'dark' ? '#000' : '#fff',
    };

    const textStyle: TextStyle = {
        ...styles.text,
        color: currentTheme === 'dark' ? '#000' : '#000',
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={containerStyle}>
                <View style={styles.switchContainer}>
                    <Text style={textStyle}>Current Theme: {theme}</Text>
                    <Button title="Change Theme" onPress={() => bottomSheetRef.current?.expand()} />
                </View>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={[250]}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Select Theme</Text>
                            <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
                                <CustomIcon name="close" size={24} color={currentTheme === 'dark' ? '#fff' : '#000'} />
                            </TouchableOpacity>
                        </View>
                        {themes.map((themeOption) => (
                            <TouchableOpacity
                                key={themeOption.index}
                                onPress={() => handleThemeSelect(themeOption.index)}
                                style={styles.checkboxWrapper}
                            >
                                <CheckBox
                                    checked={themeOption.checked}
                                    onToggle={() => handleThemeSelect(themeOption.index)}
                                />
                                <Text style={styles.checkboxLabel}>{themeOption.theme}</Text>
                            </TouchableOpacity>
                        ))}
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
};

export default ProfileScreenComponent;

