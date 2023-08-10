import React from 'react';
import {Text, View} from 'react-native';

const HomeScreen = (props: any) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'red'}}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
