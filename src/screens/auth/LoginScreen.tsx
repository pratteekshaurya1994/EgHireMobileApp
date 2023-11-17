import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import CustomAuthTopBar from '../../components/CustomAuthTopBar';
import {CommonStyles, CustomHooks} from '../../helpers';
import {KeyboardAvoidCommonView} from '../../components/core';
import {Colors, FontConfig} from '../../constants';
import LoginHomeTab from './loginTabs/LoginHomeTab';

const LoginScreen = (props: any) => {
  const [activeTab, setActiveTab] = useState<Number>(1);
  const panResponder: any = CustomHooks.usePanResponder(3, setActiveTab);
  const navigation: any = props.navigation;

  const tabs = [
    {title: 'Home', index: 1},
    {title: 'Feature', index: 2},
    {title: 'Contact', index: 3},
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Login',
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: Colors.secondary,
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      <StatusBar backgroundColor={Colors.secondary} />
      <KeyboardAvoidCommonView style={CommonStyles.topRadiusStyle}>
        <CustomAuthTopBar
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          tabsData={tabs}
          TabContainerStyle={styles.tabContainerStyle}
        />
        {activeTab === 1 && <LoginHomeTab navigation={navigation} />}
      </KeyboardAvoidCommonView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.secondary},
  keyboardAvoidCommonViewStyle: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  tabContainerStyle: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default LoginScreen;
