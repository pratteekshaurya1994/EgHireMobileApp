import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const SignupJobSeekerScreen = (props: any) => {
  const navigation = props.navigation;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={() => {}}>
        <Text style={{color: 'red'}}>SignupJobSeekerScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupJobSeekerScreen;
