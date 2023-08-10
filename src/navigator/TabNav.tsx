import * as React from 'react';
import {NavigateTo} from '../constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName={NavigateTo.HomeScreen}>
      <Tab.Screen
        name={NavigateTo.HomeScreen}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={NavigateTo.ProfileScreen}
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
