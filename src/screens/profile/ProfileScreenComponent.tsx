import React, { useCallback, useRef } from "react";
import { Button, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import styles from "./styles";
import { useTheme } from "../../context/ThemeProviders";

interface ProfileScreenComponentProps {
    isEnabled: boolean;
    toggleSwitch: () => void;
}

const ProfileScreenComponent: React.FC<ProfileScreenComponentProps> = ({ isEnabled, toggleSwitch }) => {
    const { theme, setTheme } = useTheme();
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.switchContainer}>
                <Text style={styles.labelText}>Current Theme: {theme}</Text>
                <Button title="Change Theme" onPress={() => bottomSheetRef.current?.expand()} />
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1} // Start with the bottom sheet closed
                snapPoints={[250]} // Adjust the height as needed
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text style={{ fontSize: 18, marginBottom: 20 }}>Select Theme</Text>

                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

export default ProfileScreenComponent;
