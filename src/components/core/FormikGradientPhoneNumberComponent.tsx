import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import FontConfig from '../../constants/FontConfig';
import Colors from '../../constants/Colors';
import LabelComponent from './LabelComponent';
import {FieldProps} from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import {ImageConfig} from '../../constants';

export interface FormikGradientPhoneNumberComponentProps {
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
  onApply?: (value: any) => void;
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
  inputRef?: any;
  showApply?: boolean;
  isApplyLoading?: boolean;
}

const FormikGradientPhoneNumberComponent = (
  props: FormikGradientPhoneNumberComponentProps,
) => {
  const {
    labelText,
    formikField,
    inputProperties,
    onUpdate,
    onApply,
    trimSpaces,
    trimSpecialCharacters,
    trimNumbers,
    trimCharacters,
    errorMessage,
    errorText,
    inputRef,
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
  const showApply = props.showApply || false;
  const isApplyLoading = props.isApplyLoading || false;

  const hasError =
    form.touched[field.name] && form.errors && form.errors[field.name];
  const style: any = props.style || {
    borderColor: styles.inputWrapper.borderColor,
  };
  const trimLeft = props.trimLeft === undefined ? false : props.trimLeft;
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
      <LinearGradient
        colors={
          hasFocus
            ? ['#ffa220', '#65ff67', '#4eebd4']
            : hasError
            ? [Colors.primary, Colors.primary, Colors.primary]
            : [Colors.borderColor, Colors.borderColor, Colors.borderColor]
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.3, 0.59, 0.77]}
        style={[
          styles.inputWrapper,
          style,
          {
            padding: 2,
            width: '100%',
          },
        ]}>
        <View
          style={{
            backgroundColor: 'white',
            height: 50,
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}></View>
        <View
          style={{
            backgroundColor: 'white',
            height: 50,
            width: '15%',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              color: Colors.textDark,
              fontFamily: FontConfig.Lato.bold,
              fontSize: 15,
            }}>
            +91
          </Text>
        </View>
        <TextInput
          placeholderTextColor={'#8B8E9080'}
          style={[
            styles.input,
            {
              color: !editable ? Colors.textLight : Colors.textDark,
              // width: showApply ? '80%' : '80%',
              width: '70%',
              backgroundColor: 'white',
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            },
            inputStyles,
          ]}
          value={field.value}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoComplete="off"
          onFocus={onFocus}
          nativeID={field.name}
          testID={field.name}
          onChangeText={textChangeHandler}
          onBlur={onInputBlur}
          editable={editable}
          {...inputProperties}
          ref={inputRef}
        />
        {showApply && (
          <TouchableOpacity style={styles.applyWrapper} onPress={onApply}>
            {isApplyLoading ? (
              <ActivityIndicator color={Colors.primary} />
            ) : (
              <Text style={styles.applyTextStyle}>Apply</Text>
            )}
          </TouchableOpacity>
        )}

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
      </LinearGradient>
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
    borderColor: Colors.borderColor,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    color: Colors.textDark,
    fontFamily: FontConfig.Lato.regular,
    fontSize: 15,
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
  applyWrapper: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyTextStyle: {
    color: Colors.primary,
    fontFamily: FontConfig.Lato.bold,
    paddingVertical: 5,
  },
});

export default FormikGradientPhoneNumberComponent;
