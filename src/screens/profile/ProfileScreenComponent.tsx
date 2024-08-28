import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import styles from "./styles";
import CheckBox from "../../components/CheckBox/CheckBox";


import { theme, useTheme } from "../../context/ThemeProviders";
import CustomIcon from "../../components/customIcon";

interface ProfileScreenComponentProps {
    isEnabled: boolean;
    toggleSwitch: () => void;
}

interface ThemeOption {
    index: number;
    theme: theme; // Ensure this matches the 'theme' type defined in your context
    checked: boolean;
}

const ProfileScreenComponent: React.FC<ProfileScreenComponentProps> = ({ isEnabled, toggleSwitch }) => {
    const { theme, setTheme } = useTheme();
    const bottomSheetRef = useRef<BottomSheet>(null);

    // Update the checked state of the options based on the selected theme
    useEffect(() => {
        setThemes(prevThemes =>
            prevThemes.map(themeOption => ({
                ...themeOption,
                checked: themeOption.theme === theme
            }))
        );
    }, [theme]);


    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const initialThemes: ThemeOption[] = [
        { index: 0, theme: 'system', checked: false },
        { index: 1, theme: 'light', checked: false },
        { index: 2, theme: 'dark', checked: false },
    ];

    const [themes, setThemes] = useState<ThemeOption[]>(initialThemes);

    // Update checkboxes to reflect the currently selected theme
    const handleThemeSelect = (index: number) => {
        const updatedThemes = themes.map(themeOption => ({
            ...themeOption,
            checked: themeOption.index === index
        }));

        const selectedTheme = updatedThemes.find(item => item.checked)?.theme;
        console.log("selectedTheme---", selectedTheme);

        setTheme(selectedTheme as theme);
        bottomSheetRef.current?.close()
        setThemes(updatedThemes);
    };



    // Define styles based on the current theme
    const containerStyle: ViewStyle = {
        ...styles.container,
        backgroundColor: theme === 'dark' ? '#000' : '#fff', // Adjusted dark mode color
    };

    const textStyle: TextStyle = {
        ...styles.text,
        color: theme === 'dark' ? '#000' : '#000', // Adjusted dark mode text color
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
                    index={-1} // Start with the bottom sheet closed
                    snapPoints={[250]} // Adjust the height as needed
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Select Theme</Text>
                            <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
                                <CustomIcon name="close" size={24} color={theme === 'dark' ? '#000' : '#000'} />
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
