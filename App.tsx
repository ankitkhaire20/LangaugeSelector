/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import RootContainer from './src/screens/RootContainer';
import { ThemeProvider } from './src/context/ThmeContext';
import { AuthProvider } from './src/context/AuthContext';


function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootContainer />
      </ThemeProvider >
    </AuthProvider>
  )
}


export default App;
