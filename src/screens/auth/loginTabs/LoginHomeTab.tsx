import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CustomButton, FormikInputComponent} from '../../../components/core';
import {Field, FieldProps, Formik, FormikHelpers} from 'formik';
import {LoginDetailsSchema} from '../../../constants/ValidationSchema';
import {
  LoginDetailsInitialValues,
  LoginDetailsTypes,
} from '../../../constants/CommonTypes';
import {Colors, FontConfig, ImageConfig, NavigateTo} from '../../../constants';

const LoginHomeTab = (props: any) => {
  const navigation = props.navigation;

  const loginFormHandler = useCallback(
    async (
      values: LoginDetailsTypes,
      formikHelpers: FormikHelpers<LoginDetailsTypes>,
    ) => {
      // setIsButtonLoading(true);
      // formikHelpers.setSubmitting(true);
      console.log('values: ', values);
    },
    [],
  );
  const [isPassword, setIsPassword] = useState(true);
  return (
    <View style={styles.formBlock}>
      <View style={styles.formHolder}>
        <Formik
          onSubmit={loginFormHandler}
          validationSchema={LoginDetailsSchema}
          validateOnBlur={true}
          initialValues={LoginDetailsInitialValues}>
          {({handleSubmit, isSubmitting, isValid}) => (
            <>
              <View>
                <Field name={'email'}>
                  {(field: FieldProps) => (
                    <FormikInputComponent
                      trimSpaces={true}
                      labelText="Email"
                      inputProperties={{
                        keyboardType: 'default',
                        placeholder: 'Email address',
                      }}
                      formikField={field}
                    />
                  )}
                </Field>
                <View>
                  <Field name={'password'}>
                    {(field: FieldProps) => (
                      <View style={styles.rowElements}>
                        <FormikInputComponent
                          labelText="Password"
                          trimSpaces={true}
                          inputProperties={{
                            secureTextEntry: isPassword,
                            placeholder: 'Enter Password',
                          }}
                          formikField={field}
                        />
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            bottom: 20,
                            right: 10,
                          }}
                          onPress={() => {
                            setIsPassword(prevState => !prevState);
                          }}>
                          {isPassword ? (
                            <>
                              <ImageConfig.EyeOpenIcon
                                color={'red'}
                                style={{
                                  borderRadius: 100,
                                  marginRight: 10,
                                }}
                                height={'25'}
                                width={'25'}
                              />
                            </>
                          ) : (
                            <>
                              <ImageConfig.EyeCloseOpen
                                color={'red'}
                                style={{
                                  borderRadius: 100,
                                  marginRight: 10,
                                }}
                                height={'25'}
                                width={'25'}
                              />
                            </>
                          )}
                        </TouchableOpacity>
                      </View>
                    )}
                  </Field>
                </View>

                <TouchableOpacity
                  testID={'forgot_password_btn'}
                  onPress={() => {
                    navigation.navigate(NavigateTo.OtpScreen);
                  }}
                  style={styles.forgotPasswordHolder}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <CustomButton
                  testID={'login_btn'}
                  isLoading={isSubmitting}
                  title={'Login'}
                  onPress={handleSubmit}
                  style={styles.button}
                  textStyle={{
                    textTransform: 'none',
                  }}
                  disabled={!isValid}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.openDrawer();
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      textAlign: 'center',
                      marginVertical: 10,
                    }}>
                    Don't have an account yet?{' '}
                    <Text
                      style={{
                        color: Colors.secondary,
                        textDecorationLine: 'underline',
                        fontWeight: 'bold',
                      }}>
                      Sign up
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formBlock: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  formHolder: {
    flex: 1,
    margin: 10,
    justifyContent: 'space-between',
  },
  rowElements: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotPasswordHolder: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: FontConfig.Lato.regular,
    color: Colors.primary,
  },
  button: {
    marginTop: 40,
    fontFamily: FontConfig.Lato.bold,
    height: 50,
  },
});

export default LoginHomeTab;
