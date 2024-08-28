import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<any>>()


export const navigate: any = (name: string, params: any) => {
    navigationRef.current?.navigate(name, params);
    navigationRef.current && navigationRef.current.navigate(name, params);
};
