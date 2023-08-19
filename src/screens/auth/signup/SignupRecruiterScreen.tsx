import React, {useCallback, useEffect} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, FontConfig} from '../../../constants';
import {
  BaseViewComponent,
  CustomButton,
  FormikInputComponent,
  FormikPhoneInputComponent,
  KeyboardAvoidCommonView,
} from '../../../components/core';
import {CommonStyles} from '../../../helpers';
import {Field, FieldProps, Formik, FormikHelpers} from 'formik';
import {SignupAsRecruiterSchema} from '../../../constants/ValidationSchema';
import {
  SignupAsRecruiterTypes,
  SignupAsRecruiterValues,
} from '../../../constants/CommonTypes';

const SignupRecruiterScreen = (props: any) => {
  const navigation = props.navigation;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Signup as Recruiter',
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

  const signupAsRecruiterFormHandler = useCallback(
    async (
      values: SignupAsRecruiterTypes,
      formikHelpers: FormikHelpers<SignupAsRecruiterTypes>,
    ) => {
      // setIsButtonLoading(true);
      // formikHelpers.setSubmitting(true);
      console.log('values: ', values);
    },
    [],
  );
  return (
    <BaseViewComponent
      normal={Platform.OS === 'android'}
      contentContainerStyle={CommonStyles.flexGrowOne}
      backgroundColor={'white'}>
      <KeyboardAvoidCommonView>
        <View style={styles.formHolder}>
          <Formik
            onSubmit={signupAsRecruiterFormHandler}
            validationSchema={SignupAsRecruiterSchema}
            validateOnBlur={true}
            initialValues={SignupAsRecruiterValues}>
            {({handleSubmit, isSubmitting, isValid}) => (
              <>
                <Field name={'firstName'}>
                  {(field: FieldProps) => (
                    <FormikInputComponent
                      trimSpaces={true}
                      labelText="First Name"
                      inputProperties={{
                        keyboardType: 'default',
                        placeholder: 'First Name',
                      }}
                      formikField={field}
                    />
                  )}
                </Field>
                <Field name={'lastName'}>
                  {(field: FieldProps) => (
                    <FormikInputComponent
                      trimSpaces={true}
                      labelText="Last Name"
                      inputProperties={{
                        keyboardType: 'default',
                        placeholder: 'Last Name',
                      }}
                      formikField={field}
                    />
                  )}
                </Field>
                <Field name={'companyName'}>
                  {(field: FieldProps) => (
                    <FormikInputComponent
                      trimSpaces={true}
                      labelText="Company Name"
                      inputProperties={{
                        keyboardType: 'default',
                        placeholder: 'Company Name',
                      }}
                      formikField={field}
                    />
                  )}
                </Field>
                <Field name={'email'}>
                  {(field: FieldProps) => (
                    <FormikInputComponent
                      trimSpaces={true}
                      labelText="Email address"
                      inputProperties={{
                        keyboardType: 'default',
                        placeholder: 'Email address',
                      }}
                      formikField={field}
                    />
                  )}
                </Field>
                <Field name={'phone'}>
                  {(field: FieldProps) => (
                    <FormikInputComponent
                      trimSpaces={true}
                      labelText="Phone Number"
                      inputProperties={{
                        keyboardType: 'number-pad',
                        placeholder: 'Phone Number',
                      }}
                      formikField={field}
                    />
                  )}
                </Field>
                <Field name={'address'}>
                  {(field: FieldProps) => (
                    <FormikInputComponent
                      trimSpaces={true}
                      labelText="Address"
                      inputProperties={{
                        keyboardType: 'default',
                        placeholder: 'Address',
                      }}
                      formikField={field}
                    />
                  )}
                </Field>

                <CustomButton
                  testID={'login_btn'}
                  isLoading={isSubmitting}
                  title={'Signup as Recruiter'}
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
      </KeyboardAvoidCommonView>
    </BaseViewComponent>
  );
};

const styles = StyleSheet.create({
  formHolder: {
    width: '85%',
    marginHorizontal: '5%',
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

export default SignupRecruiterScreen;
