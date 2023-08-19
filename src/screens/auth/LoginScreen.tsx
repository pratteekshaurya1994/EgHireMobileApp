import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import CustomAuthTopBar from '../../components/CustomAuthTopBar';
import {CustomHooks} from '../../helpers';
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
        elevation: 5,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'black',
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1}} {...panResponder.panHandlers}>
      <StatusBar backgroundColor={Colors.secondary} />
      <KeyboardAvoidCommonView>
        <CustomAuthTopBar
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          tabsData={tabs}
        />
        {activeTab === 1 && <LoginHomeTab navigation={navigation} />}
      </KeyboardAvoidCommonView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formBlock: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  formHolder: {
    width: '85%',
    marginHorizontal: '5%',
  },
  rowElements: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotPasswordHolder: {
    flex: 1,
    alignItems: 'flex-end',
    marginTop: 5,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: FontConfig.Lato.regular,
    color: Colors.textDark,
  },
  button: {
    marginTop: 40,
    fontFamily: FontConfig.Lato.bold,
    height: 50,
  },
});

export default LoginScreen;
