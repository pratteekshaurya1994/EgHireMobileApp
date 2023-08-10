import React from 'react';
import {Text, View} from 'react-native';

const ProfileScreen = (props: any) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'red'}}>Profile Screen</Text>
    </View>
  );
};

export default ProfileScreen;
