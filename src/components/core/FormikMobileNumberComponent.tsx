import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
  Keyboard,
} from 'react-native';
import FontConfig from '../../constants/FontConfig';
import Colors from '../../constants/Colors';
import LabelComponent from './LabelComponent';
import {FieldProps} from 'formik';
import MaskInput from 'react-native-mask-input';

export interface FormikMobileNumberComponentProps {
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
  trimSpaces?: boolean;
  trimSpecialCharacters?: boolean;
  trimNumbers?: boolean;
  trimLeft?: boolean;
  isRequired?: boolean;
  trimCharacters?: boolean;
  secureTextEntry?: any;
  errorMessage?: any;
  editable?: boolean;
}

const FormikMobileNumberComponent = (
  props: FormikMobileNumberComponentProps,
) => {
  const {
    labelText,
    formikField,
    inputProperties,
    onUpdate,
    trimSpaces,
    trimSpecialCharacters,
    trimNumbers,
    trimCharacters,
    errorMessage,
    errorText,
  } = props;

  const {field, form} = formikField;
  const [hasFocus, setHasFocus] = useState(false);
  const showLabel =
    props.showLabel !== undefined
      ? props.showLabel
      : !!(labelText && labelText.length > 0);
  const inputStyles = props.inputStyles || {};
  const baseStyle = props.baseStyle || {};
  const isRequired = props.isRequired !== undefined ? props.isRequired : true;
  const editable = props.editable !== undefined ? props.editable : true;
  const inputWrapperStyle = props.inputWrapperStyle || {};
  const errorContainerStyle = props.errorContainerStyle || {};

  const hasError =
    form.touched[field.name] && form.errors && form.errors[field.name];
  const style: any = props.style || {
    borderColor: styles.inputWrapper.borderColor,
  };
  const trimLeft = props.trimLeft === undefined ? false : props.trimLeft;
  const [text, setText] = useState(field.value);
  const textChangeHandler = (text: string) => {
    if (trimSpaces) {
      text = text.replace(/ /g, '');
    }
    if (trimSpecialCharacters) {
      text = text.replace(/[^a-zA-Z0-9 ]/g, '');
    }
    if (trimNumbers) {
      text = text.replace(/[^a-zA-Z ]/g, '');
    }
    if (trimCharacters) {
      text = text.replace(/[^0-9 ]/g, '');
    }
    if (trimLeft) {
      text = text.trimLeft();
    }
    if (!text) {
      return text;
    }
    form.setFieldTouched(field.name);
    form.setFieldValue(field.name, text);
    if (onUpdate) {
      onUpdate(text);
    }
  };

  const onInputBlur = () => {
    setHasFocus(false);
    Keyboard.dismiss;
    form.handleBlur(field.name);
    form.setFieldTouched(field.name);
  };
  const onFocus = () => {
    setHasFocus(true);
  };

  return (
    <View style={[styles.inputBaseWrapper, baseStyle, inputWrapperStyle]}>
      {showLabel && (
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <LabelComponent title={labelText || ''} style={{marginBottom: 10}} />
          {isRequired && (
            <Text style={{color: Colors.primary, top: -4}}>*</Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.inputWrapper,
          style,
          {
            borderColor: hasFocus
              ? Colors.borderColor
              : hasError
              ? Colors.primary
              : style && style.borderColor
              ? style.borderColor
              : styles.inputWrapper.borderColor,
          },
        ]}>
        <MaskInput
          style={[
            styles.input,
            {color: !editable ? Colors.textLight : Colors.textDark},
            inputStyles,
          ]}
          nativeID={field.name}
          testID={field.name}
          value={text}
          placeholderTextColor={'#8B8E9080'}
          onChangeText={(masked, unmasked) => {
            setText(masked);
            textChangeHandler(unmasked);
          }}
          editable={editable}
          mask={[
            '(',
            /\d/,
            /\d/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
          autoCapitalize={'none'}
          autoCorrect={false}
          // @ts-ignore
          autoCompleteType={'off'}
          onFocus={onFocus}
          onBlur={onInputBlur}
          {...inputProperties}
        />

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
    </View>
  );
};

const styles = StyleSheet.create({
  inputBaseWrapper: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 5,
  },
  labelText: {
    fontFamily: FontConfig.Lato.regular,
    fontSize: 14,
    color: Colors.textLight,
  },
  baseErrorContainerStyle: {
    top: -12,
  },

  inputWrapper: {
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: Colors.borderColor,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    color: Colors.textDark,
    fontFamily: FontConfig.Lato.regular,
    fontSize: 14,
  },
  errorContainer: {
    marginTop: -5,
    position: 'absolute',
    right: 0,
  },
  errorText: {
    fontFamily: FontConfig.Lato.regular,
    color: Colors.primary,
    fontSize: 13,
    textTransform: 'capitalize',
  },
});

export default FormikMobileNumberComponent;
