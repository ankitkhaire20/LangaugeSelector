// src/components/ThemeBottomSheet.tsx
import React, { useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '../../context/ThemeProviders';


const ThemeBottomSheet: React.FC<{ bottomSheetRef: React.RefObject<BottomSheet> }> = ({ bottomSheetRef }) => {
    const { theme, setTheme } = useTheme();

    const handleThemeChange = useCallback((newTheme: 'light' | 'dark' | 'system') => {
        setTheme(newTheme);
    }, [setTheme]);

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1} // Initially closed
                snapPoints={[250]} // Height of the bottom sheet
            >
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 18, marginBottom: 20 }}>Select Theme</Text>
                    <Button title="Light Theme" onPress={() => handleThemeChange('light')} />
                    <Button title="Dark Theme" onPress={() => handleThemeChange('dark')} />
                    <Button title="System Theme" onPress={() => handleThemeChange('system')} />
                    <Text style={{ marginTop: 20 }}>Current Theme: {theme}</Text>
                </View>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default ThemeBottomSheet;
