import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigateTo} from '../../constants';

const SignupScreen = (props: any) => {
  const navigation = props.navigation;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(NavigateTo.MainStack);
        }}>
        <Text style={{color: 'red'}}>Signup Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
