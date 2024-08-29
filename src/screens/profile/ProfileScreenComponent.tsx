import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styles from "./styles";
import CheckBox from "../../components/CheckBox/CheckBox";
import CustomIcon from "../../components/customIcon";




interface ProfileScreenComponentProps {
    isEnabled: boolean;
    toggleSwitch: () => void;
}


// ProfileScreenComponent.tsx

const ProfileScreenComponent: React.FC<ProfileScreenComponentProps> = ({ isEnabled, toggleSwitch }) => {

    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const initialThemes = [
        { index: 0, theme: 'system', checked: false },
        { index: 1, theme: 'light', checked: false },
        { index: 2, theme: 'dark', checked: false },
    ];

    const [themes, setThemes] = useState(initialThemes);



    const handleThemeSelect = (index: number) => {
        const updatedThemes = themes.map((themeOption) => ({
            ...themeOption,
            checked: themeOption.index === index,
        }));

        const selectedTheme = updatedThemes.find((item) => item.checked)?.theme;
        console.log("selectedTheme---", selectedTheme);

        bottomSheetRef.current?.close();
        setThemes(updatedThemes);
    };



    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.switchContainer}>
                    <Text style={{}}>Current Theme: { }</Text>
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
                                <CustomIcon name="close" size={24} color={'#000'} />
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

