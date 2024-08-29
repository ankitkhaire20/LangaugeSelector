import React, { useCallback, useMemo, useRef, useState } from "react";
import ProfileScreenComponent from "./ProfileScreenComponent";

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button, Text, View } from "react-native";
import styles from "./styles";


const ProfileScreenContainer: React.FC = () => {

    const [isEnabled, setIsEnabled] = useState(false)


    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

    // callbacks
    const handleSheetChange = useCallback((index: any) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index: number) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);


    return (
        <>
            <ProfileScreenComponent
                isEnabled={false}
                toggleSwitch={function (): void {
                    throw new Error("Function not implemented.");
                }} />
        </>
    )
}
export default ProfileScreenContainer;