import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Colors, NavigateTo} from '../constants';

const CustomAuthDrawerComponent = (props: any) => {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.navigate(NavigateTo.SignupRecruiterScreen);
          }}
          style={styles.buttonContainer}>
          <Text style={styles.textStyle}>Signup as recruiter</Text>
        </TouchableOpacity>
        <View style={{marginTop: 30}} />
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.navigate(NavigateTo.SignupJobSeekerScreen);
          }}
          style={styles.buttonContainer}>
          <Text style={styles.textStyle}>Signup as jobseeker</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 300},
  buttonContainer: {
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.secondary,
  },
});

export default CustomAuthDrawerComponent;
