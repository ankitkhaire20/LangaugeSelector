import React, { useCallback, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { useTheme } from '../../context/ThmeContext'; // Adjust the import path
import ProfileScreenComponent from './ProfileScreenComponent'; // Adjust the import path
import useAuth from '../../components/hooks/useAuth';

const ProfileScreenContainer: React.FC = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { theme, setTheme, currentThemeProperties } = useTheme();
    const { logout } = useAuth();

    const handleSheetChanges = useCallback((index: number) => {
        console.log('Bottom Sheet Index:', index);
    }, []);

    const handleThemeSelect = (theme: 'dark' | 'light' | 'system') => {
        setTheme(theme);
        bottomSheetRef.current?.close();
    };

    const handleExpandBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };

    const handleLogout = async () => {
        console.log("Hello---");

        try {
            await logout();
            // Optionally, navigate to a different screen after logout
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <ProfileScreenComponent
            theme={theme}
            currentThemeProperties={currentThemeProperties}
            onChangeTheme={handleThemeSelect}
            onExpandBottomSheet={handleExpandBottomSheet}
            bottomSheetRef={bottomSheetRef}
            handleSheetChanges={handleSheetChanges}
            onPressLogout={handleLogout} // Pass the logout handler
        />
    );
};

export default ProfileScreenContainer;
