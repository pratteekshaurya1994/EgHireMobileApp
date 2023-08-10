import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigateTo} from '../constants';

const WelcomeScreen = (props: any) => {
  const navigation = props.navigation;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(NavigateTo.MainStack);
    }, 5000);
  });
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(NavigateTo.MainStack);
        }}>
        <Text style={{color: 'red'}}>EG HIRE WELCOME SCREEN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
