import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigator/MainNav';

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;
