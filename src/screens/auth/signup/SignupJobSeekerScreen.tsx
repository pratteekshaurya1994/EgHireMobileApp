import React, {useCallback, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Colors, FontConfig} from '../../../constants';
import {
  CustomButton,
  FormikInputComponent,
  KeyboardAvoidCommonView,
} from '../../../components/core';
import {CommonStyles} from '../../../helpers';
import {Field, FieldProps, Formik, FormikHelpers} from 'formik';
import {SignupAsJobSeekerSchema} from '../../../constants/ValidationSchema';
import {
  SignupAsJobSeekerTypes,
  SignupAsJobSeekerValues,
} from '../../../constants/CommonTypes';

const SignupJobSeekerScreen = (props: any) => {
  const navigation = props.navigation;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Signup as Job Seeker',
      headerTintColor: 'black',
      headerStyle: {
        backgroundColor: Colors.secondary,
        // elevation: 5,
        // shadowOpacity: 0.3,
        // shadowRadius: 5,
        // shadowColor: 'black',
      },
    });
  }, [navigation]);

  const SignupAsJobSeekerFormHandler = useCallback(
    async (
      values: SignupAsJobSeekerTypes,
      formikHelpers: FormikHelpers<SignupAsJobSeekerTypes>,
    ) => {
      // setIsButtonLoading(true);
      // formikHelpers.setSubmitting(true);
      console.log('values: ', values);
    },
    [],
  );
  return (
    <KeyboardAvoidCommonView style={styles.container}>
      <SafeAreaView
        style={[CommonStyles.topRadiusStyle, CommonStyles.flexGrowOne]}>
        <ScrollView>
          <View style={styles.formHolder}>
            <Formik
              onSubmit={SignupAsJobSeekerFormHandler}
              validationSchema={SignupAsJobSeekerSchema}
              validateOnBlur={true}
              initialValues={SignupAsJobSeekerValues}>
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
                        trimSpecialCharacters={true}
                        trimCharacters={true}
                        trimLeft={true}
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
                    title={'Signup as Job Seeker'}
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
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidCommonView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
  },
  formHolder: {
    flex: 1,
    margin: 10,
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

export default SignupJobSeekerScreen;
