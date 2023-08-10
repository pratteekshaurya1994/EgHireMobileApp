import React, {useCallback, useRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {Colors, FontConfig} from '../../constants';
import {FieldProps} from 'formik';
import LabelComponent from './LabelComponent';
import LinearGradient from 'react-native-linear-gradient';

export interface FormikPhoneInputComponentProps {
  showLabel?: boolean;
  labelText?: string;
  inputStyles?: StyleProp<TextStyle>;
  errorText?: StyleProp<TextStyle>;
  errorContainerStyle?: StyleProp<ViewStyle>;
  baseStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
  formikField: FieldProps;
  onUpdate?: (value: any) => void;
  inputProperties?: TextInputProps;
  secureTextEntry?: any;
  errorMessage?: any;
}

const FormikPhoneInputComponent = (props: FormikPhoneInputComponentProps) => {
  const {
    labelText,
    formikField,
    inputProperties,
    onUpdate,
    errorMessage,
    errorText,
  } = props;

  const {field, form} = formikField;

  const hasError =
    form.touched[field.name] && form.errors && form.errors[field.name];

  const showLabel =
    props.showLabel !== undefined
      ? props.showLabel
      : !!(labelText && labelText.length > 0);

  const inputStyles = props.inputStyles || {};
  const errorContainerStyle = props.errorContainerStyle || {};

  const phoneInput = useRef<any>(null);
  const style: any = props.style || {
    borderColor: styles.inputWrapper.borderColor,
  };

  const textChangeHandler = useCallback(
    (text: any) => {
      form.setFieldTouched(field.name);
      form.setFieldValue(field.name, text);
      if (onUpdate) {
        onUpdate(text);
      }
    },
    [field.name, form, onUpdate],
  );

  return (
    <>
      {showLabel && <LabelComponent title={labelText || ''} />}
      <LinearGradient
        colors={[
          'rgba(255,162,32,1)',
          'rgba(101,255,103,0.9977240896358543)',
          'rgba(78,235,212,1)',
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.3, 0.59, 0.77]}
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'flex-start',
          borderRadius: 10,
          // width: '90%',
        }}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={''}
          defaultCode="IN"
          layout="first"
          textInputProps={{
            autoCapitalize: 'none',
            autoCorrect: false,
            maxLength: 10,
            autoCompleteType: 'tel',
            keyboardType: 'phone-pad',
            placeholder: 'Phone number',
            ...inputProperties,
            placeholderTextColor: Colors.textLight,
          }}
          textInputStyle={[{padding: 0}, inputStyles]}
          textContainerStyle={{
            padding: 0,
            height: 55,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: 'transparent',
          }}
          containerStyle={[
            {
              width: '100%',
              // marginRight: 0,
              borderRadius: 50,
              overflow: 'hidden',
            },
            // props.baseStyle,
            // style,
            {
              borderWidth: 2,
              borderColor: 'transparent',
            },
            {
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            },
            {
              // Set linear gradient as border
              borderColor: 'transparent',
              borderWidth: 2,
              borderRadius: 10,
              overflow: 'hidden',
            },
          ]}
          onChangeText={textChangeHandler}
          autoFocus
        />
      </LinearGradient>
      {(errorMessage || hasError) && (
        <View
          style={[
            styles.errorContainer,
            styles.baseErrorContainerStyle,
            errorContainerStyle,
          ]}>
          <Text style={[styles.errorText, errorText]}>
            {errorMessage || form.errors[field.name]}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {marginVertical: 10},
  baseErrorContainerStyle: {
    top: 52,
  },
  inputWrapper: {
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.backgroundColor,
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    padding: 5,
    height: 45,
    borderRadius: 10,
    width: '99%',
    color: Colors.textDark,
    backgroundColor: Colors.backgroundColor,
    fontSize: 16,
    fontFamily: FontConfig.Lato.regular,
  },
  errorContainer: {
    marginVertical: 5,
    position: 'absolute',
    right: 0,
  },
  errorText: {
    fontFamily: FontConfig.Lato.regular,
    color: Colors.warn,
    fontSize: 14,
    textTransform: 'lowercase',
  },
});

export default FormikPhoneInputComponent;
