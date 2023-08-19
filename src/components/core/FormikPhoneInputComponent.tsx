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
      {showLabel && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <LabelComponent title={labelText || ''} />
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
        </View>
      )}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          borderRadius: 10,
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
            autoComplete: 'tel',
            keyboardType: 'phone-pad',
            placeholder: 'Phone number',
            ...inputProperties,
            placeholderTextColor: Colors.textLight,
          }}
          textInputStyle={[{padding: 0}, inputStyles]}
          textContainerStyle={{
            backgroundColor: '#00000000',
          }}
          containerStyle={[
            {
              width: '100%',
              overflow: 'hidden',
              borderBottomColor: hasError ? Colors.warn : Colors.secondary,
              borderBottomWidth: 1.5,
            },
          ]}
          onChangeText={textChangeHandler}
          autoFocus
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {marginVertical: 10},
  baseErrorContainerStyle: {},
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
  errorContainer: {},
  errorText: {
    fontFamily: FontConfig.Lato.regular,
    color: Colors.warn,
    fontSize: 13,
    textTransform: 'capitalize',
  },
});

export default FormikPhoneInputComponent;
