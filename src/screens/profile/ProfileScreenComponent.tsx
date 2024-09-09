import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from './styles';
import CustomIcon from '../../components/customIcon';
import useAuth from '../../components/hooks/useAuth';
import { Color, FontFamily } from '../../utills/theme';

interface ProfileScreenComponentProps {
    theme: 'dark' | 'light' | 'system';
    currentThemeProperties: {
        backgroundColor: string;
        textColor: string;
    };
    onChangeTheme: (theme: 'dark' | 'light' | 'system') => void;
    onExpandBottomSheet: () => void;
    bottomSheetRef: React.RefObject<BottomSheet>;
    handleSheetChanges: (index: number) => void;
    onPressLogout: () => void;
}

const ProfileScreenComponent: React.FC<ProfileScreenComponentProps> = ({
    theme,
    currentThemeProperties,
    onChangeTheme,
    onExpandBottomSheet,
    bottomSheetRef,
    onPressLogout,
    handleSheetChanges
}) => {
    const { logout, userDetails } = useAuth();

    return (
        <GestureHandlerRootView style={[styles.container, {
            backgroundColor: currentThemeProperties.backgroundColor
        }]}>
            <Text style={{
                fontSize: 24, color: currentThemeProperties.textColor,

            }} >
                Hello {userDetails?.Firstname}
                {userDetails?.lastName}</Text>
            <View style={styles.switchContainer}>
                <Text style={[styles.headerText,
                { color: currentThemeProperties.textColor }]}>
                    Theme: {theme}
                </Text>
                <TouchableOpacity
                    style={[styles.changeThemeButton,]}
                    onPress={() => bottomSheetRef.current?.expand()}
                >
                    <Text style={[styles.buttonText,
                    { color: currentThemeProperties.textColor }]}>
                        Change Theme
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.switchContainer}>
                <Text style={[styles.headerText,
                { color: currentThemeProperties.textColor }]}>
                    LogOut
                </Text>
                <TouchableOpacity
                    style={[styles.changeThemeButton,]}
                    onPress={() => onPressLogout()}
                >
                    <CustomIcon name="logout" size={28} />
                </TouchableOpacity>
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={[250]}
                onChange={handleSheetChanges}
            >
                <BottomSheetView style={[styles.bottomSheetContent, { backgroundColor: currentThemeProperties.backgroundColor }]}>
                    <Text style={[styles.headerText, { color: currentThemeProperties.textColor }]}>
                        Select Theme
                    </Text>
                    <TouchableOpacity
                        style={[styles.option, { backgroundColor: theme === 'dark' ? '#e0e0e0' : '#fff' }]}
                        onPress={() => onChangeTheme('dark')}
                    >
                        <Text style={[styles.optionText, { color: theme === 'dark' ? '#000' : '#000' }]}>
                            Dark Mode
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.option, { backgroundColor: theme === 'light' ? '#e0e0e0' : '#fff' }]}
                        onPress={() => onChangeTheme('light')}
                    >
                        <Text style={[styles.optionText, { color: theme === 'light' ? '#000' : '#000' }]}>
                            Light Mode
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.option, { backgroundColor: theme === 'system' ? '#e0e0e0' : '#fff' }]}
                        onPress={() => onChangeTheme('system')}
                    >
                        <Text style={[styles.optionText, { color: theme === 'system' ? '#000' : '#000' }]}>
                            System Default
                        </Text>
                    </TouchableOpacity>
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

export default ProfileScreenComponent;
