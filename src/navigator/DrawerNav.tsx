import * as React from 'react';
import {NavigateTo} from '../constants';
import LoginScreen from '../screens/auth/LoginScreen';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';
import TabNavigator from './TabNav';
import CustomTabDrawerComponent from '../components/CustomTabDrawerComponent';
import CustomAuthDrawerComponent from '../components/CustomAuthDrawerComponent';
import SignupRecruiterScreen from '../screens/auth/signup/SignupRecruiterScreen';
import SignupJobSeekerScreen from '../screens/auth/signup/SignupJobSeekerScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';
import OtpScreen from '../screens/auth/OtpScreen';

const drawerScreenOptions: DrawerNavigationOptions = {
  drawerType: 'front',
};

const DrawerTabStack = createDrawerNavigator();

const DrawerTabNavigator = () => {
  return (
    <DrawerTabStack.Navigator
      screenOptions={drawerScreenOptions}
      drawerContent={props => <CustomTabDrawerComponent {...props} />}
      initialRouteName={NavigateTo.TabStack}>
      <DrawerTabStack.Screen
        name={NavigateTo.TabStack}
        component={TabNavigator}
        options={{headerShown: true}}
      />
    </DrawerTabStack.Navigator>
  );
};

const DrawerAuthStack = createDrawerNavigator();

const DrawerAuthNavigator = () => {
  return (
    <DrawerAuthStack.Navigator
      screenOptions={drawerScreenOptions}
      drawerContent={props => <CustomAuthDrawerComponent {...props} />}
      initialRouteName={NavigateTo.LoginScreen}>
      <DrawerAuthStack.Screen
        name={NavigateTo.LoginScreen}
        component={LoginScreen}
        options={{headerShown: true}}
      />
      <DrawerAuthStack.Screen
        name={NavigateTo.ForgotPasswordScreen}
        component={ForgotPasswordScreen}
        options={{headerShown: true}}
      />
      <DrawerAuthStack.Screen
        name={NavigateTo.OtpScreen}
        component={OtpScreen}
        options={{headerShown: true}}
      />
      <DrawerAuthStack.Screen
        name={NavigateTo.SignupJobSeekerScreen}
        component={SignupJobSeekerScreen}
        options={{headerShown: false}}
      />
      <DrawerAuthStack.Screen
        name={NavigateTo.SignupRecruiterScreen}
        component={SignupRecruiterScreen}
        options={{headerShown: false}}
      />
    </DrawerAuthStack.Navigator>
  );
};

export {DrawerTabNavigator, DrawerAuthNavigator};
