import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors, FontConfig, NavigateTo} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {LoadingComponent} from '../components/core';

const WelcomeScreen = (props: any) => {
  const navigation = props.navigation;
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(NavigateTo.AuthStack);
    }, 4000);
  });
  useEffect(() => {
    setTimeout(() => {
      setShowLoader(true);
    }, 2000);
  });
  return (
    <LinearGradient
      colors={['#10C4D3', '#4FE6AF']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0.42, 0.67]}
      style={styles.container}>
      <StatusBar backgroundColor={Colors.secondary} />
      <Text style={styles.headerText}>EGHire Unbeatables</Text>
      {showLoader && (
        <LoadingComponent
          backgroundColor={'transparent'}
          style={{flex: 0, marginTop: 50}}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  headerText: {
    color: Colors.textOnPrimary,
    fontFamily: FontConfig.Lato.bold,
    fontWeight: 'bold',
    fontSize: 30,
    textShadowColor: Colors.primary,
    textShadowRadius: 2,
    textShadowOffset: {width: 3, height: 3},
  },
});

export default WelcomeScreen;
