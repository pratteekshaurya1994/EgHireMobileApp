import * as React from 'react';
import {NavigateTo} from '../constants';
import LoginScreen from '../screens/auth/LoginScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerComponent from '../components/CustomDrawerComponent';
import SignupScreen from '../screens/auth/SignupScreen';
import TabNavigator from './TabNav';

const DrawerStack = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <DrawerStack.Navigator
      drawerContent={props => <CustomDrawerComponent {...props} />}
      initialRouteName={NavigateTo.LoginScreen}>
      <DrawerStack.Screen
        name={NavigateTo.LoginScreen}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <DrawerStack.Screen
        name={NavigateTo.SignupScreen}
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <DrawerStack.Screen
        name={NavigateTo.TabStack}
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </DrawerStack.Navigator>
  );
};

export default DrawerNavigator;
