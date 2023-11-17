import React, {useCallback, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors, FontConfig, NavigateTo} from '../../constants';
import {
  CustomButton,
  FormikInputComponent,
  KeyboardAvoidCommonView,
} from '../../components/core';
import {CommonStyles} from '../../helpers';
import {Field, FieldProps, Formik, FormikHelpers} from 'formik';
import {forgotPasswordSchema} from '../../constants/ValidationSchema';
import {
  ForgotPasswordTypes,
  ForgotPasswordValues,
} from '../../constants/CommonTypes';

const ForgotPasswordScreen = (props: any) => {
  const navigation = props.navigation;
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Forgot Password',
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: Colors.secondary,
      },
    });
  }, [navigation]);

  const forgotPasswordFormHandler = useCallback(
    async (
      values: ForgotPasswordTypes,
      formikHelpers: FormikHelpers<ForgotPasswordTypes>,
    ) => {
      // setIsButtonLoading(true);
      // formikHelpers.setSubmitting(true);
      console.log('values: ', values);
      navigation.navigate(NavigateTo.OtpScreen);
    },
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.secondary} />
      <KeyboardAvoidCommonView style={CommonStyles.topRadiusStyle}>
        <View style={styles.formBlock}>
          <View style={styles.formHolder}>
            <Formik
              onSubmit={forgotPasswordFormHandler}
              validationSchema={forgotPasswordSchema}
              validateOnBlur={true}
              initialValues={ForgotPasswordValues}>
              {({handleSubmit, isSubmitting, isValid}) => (
                <>
                  <View
                    style={{
                      height: '50%',
                      justifyContent: 'space-around',
                    }}>
                    <View>
                      <Text style={styles.headertextStyle}>Don't worry.</Text>
                      <Text style={styles.headertextStyle}>
                        Enter your email and verify your OTP in next step
                      </Text>
                    </View>
                    <Field name={'email'}>
                      {(field: FieldProps) => (
                        <FormikInputComponent
                          trimSpaces={true}
                          labelText="Email"
                          inputProperties={{
                            keyboardType: 'email-address',
                            placeholder: 'Enter your email',
                          }}
                          formikField={field}
                        />
                      )}
                    </Field>
                  </View>

                  <CustomButton
                    testID={'login_btn'}
                    isLoading={isSubmitting}
                    title={'Continue'}
                    onPress={handleSubmit}
                    style={styles.button}
                    textStyle={{
                      textTransform: 'none',
                    }}
                    disabled={!isValid}
                  />
                </>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidCommonView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.secondary},
  formBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formHolder: {
    flex: 1,
    margin: 10,
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 40,
    height: 50,
    fontFamily: FontConfig.Lato.bold,
  },
  headertextStyle: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'justify',
  },
});

export default ForgotPasswordScreen;
