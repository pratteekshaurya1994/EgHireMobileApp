import * as React from 'react';
import {NavigateTo} from '../constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import DrawerNavigator from './DrawerNav';

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName={NavigateTo.WelcomeScreen}>
      <MainStack.Screen
        name={NavigateTo.WelcomeScreen}
        component={WelcomeScreen}
        options={{title: 'EGHire', headerShown: false}}
      />
      <MainStack.Screen
        name={NavigateTo.MainStack}
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
