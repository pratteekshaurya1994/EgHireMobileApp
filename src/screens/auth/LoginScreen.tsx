import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigateTo} from '../../constants';

const LoginScreen = (props: any) => {
  const navigation = props.navigation;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(NavigateTo.SignupScreen);
        }}>
        <Text
          style={{
            color: 'red',
          }}>
          Login Screen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;