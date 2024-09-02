/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import RootContainer from './src/screens/RootContainer';
import { ThemeProvider } from './src/context/ThmeContext';


function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <RootContainer />
    </ThemeProvider>
  )
}


export default App;
