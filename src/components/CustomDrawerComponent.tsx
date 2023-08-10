import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Text, View} from 'react-native';

const CustomDrawerComponent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Text style={{color: 'red'}}>hi</Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerComponent;
