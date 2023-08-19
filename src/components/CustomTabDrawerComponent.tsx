import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Text, View} from 'react-native';

const CustomTabDrawerComponent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Text style={{color: 'red'}}>this is tab nav</Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomTabDrawerComponent;
