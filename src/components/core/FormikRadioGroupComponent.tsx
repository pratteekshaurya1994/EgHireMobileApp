import React, {useEffect, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import FontConfig from '../../constants/FontConfig';
import Colors from '../../constants/Colors';
import LabelComponent from './LabelComponent';
import {FieldProps} from 'formik';
import RadioButtonComponent from './RadioButtonComponent';

export interface RadioButtonType {
  id: string | number | boolean;
  title: string;
  disabled?: boolean;
}

export interface FormikRadioGroupComponentProps {
  radioButtons: RadioButtonType[];
  showLabel?: boolean;
  labelText?: string;
  labelDarkText?: string;
  inputStyles?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorText?: StyleProp<TextStyle>;
  errorContainerStyle?: StyleProp<ViewStyle>;
  baseStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  radioStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  formikField: FieldProps;
  onUpdate?: (value: any) => void;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  isRequired?: boolean;
}

const FormikRadioGroupComponent = (props: FormikRadioGroupComponentProps) => {
  const {
    labelText,
    radioStyle,
    radioButtons,
    formikField,
    onUpdate,
    labelStyle,
    errorText,
  } = props;
  const {field, form} = formikField;
  const direction = props.direction || 'row';
  const showLabel =
    props.showLabel !== undefined
      ? props.showLabel
      : !!(labelText && labelText.length > 0);
  const baseStyle = props.baseStyle || {};
  const errorContainerStyle = props.errorContainerStyle || {};
  const [selectedRadio, setSelectedRadio] = useState<
    string | number | boolean | undefined
  >(field.value);

  const isRequired = props.isRequired !== undefined ? props.isRequired : true;

  useEffect(() => {
    setSelectedRadio(field.value);
  }, [field.value]);

  const hasError =
    form.touched[field.name] && form.errors && form.errors[field.name];
  const style: any = props.style || {};

  return (
    <View style={[styles.inputBaseWrapper, baseStyle]}>
      {showLabel && (
        <View style={styles.labelWrapper}>
          <LabelComponent title={labelText || ''} style={{marginBottom: 10}} />
          {isRequired && (
            <Text style={{color: Colors.primary, top: -4}}>*</Text>
          )}
        </View>
      )}

      <View style={[styles.inputWrapper, style]}>
        {hasError && (
          <View
            style={[
              styles.errorContainer,
              styles.baseErrorContainerStyle,
              errorContainerStyle,
            ]}>
            <Text style={[styles.errorText, errorText]}>
              {form.errors[field.name]
                ? form.errors[field.name]?.toString()
                : null}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.radioComponentWrapper,
            props.buttonStyle,
            {flexDirection: direction},
          ]}>
          {radioButtons &&
            radioButtons.map(radioButton => {
              return (
                <RadioButtonComponent
                  disabled={radioButton.disabled}
                  style={[
                    {
                      marginBottom: 6,
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    },
                    radioStyle,
                  ]}
                  checked={selectedRadio === radioButton.id}
                  labelStyle={[
                    {fontSize: 13, color: Colors.textDark},
                    labelStyle,
                  ]}
                  key={radioButton.id + '_' + radioButton.title}
                  label={radioButton.title}
                  onChange={value => {
                    if (!radioButton.disabled) {
                      setSelectedRadio(value);
                      form.setFieldTouched(field.name, true);
                      form.setFieldValue(field.name, value);
                      if (onUpdate) {
                        onUpdate(value);
                      }
                    }
                  }}
                  size={'xs'}
                  value={radioButton.id}
                />
              );
            })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBaseWrapper: {
    marginVertical: 8,
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  label: {
    marginBottom: 5,
  },
  labelText: {
    fontFamily: FontConfig.Lato.regular,
    fontSize: 14,
    color: Colors.textLight,
  },
  radioComponentWrapper: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  baseErrorContainerStyle: {
    top: -23,
  },

  inputWrapper: {
    marginVertical: 0,
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 0,
    color: Colors.textDark,
    fontFamily: FontConfig.Lato.regular,
    fontSize: 16,
  },
  errorContainer: {
    marginVertical: 3,
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

export default FormikRadioGroupComponent;
