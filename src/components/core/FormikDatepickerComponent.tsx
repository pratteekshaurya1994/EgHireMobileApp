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
import {FieldProps} from 'formik';
import DatePickerComponent from './DatePickerComponent';
import LabelComponent from './LabelComponent';
// import MonthYearPickerComponent from './MonthYearPickerComponent';

export interface FormikDatepickerComponentProps {
  showLabel?: boolean;
  labelText?: string;
  labelDarkText?: string;
  inputStyles?: StyleProp<TextStyle>;
  errorText?: StyleProp<TextStyle>;
  errorContainerStyle?: StyleProp<ViewStyle>;
  baseStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  formikField: FieldProps;
  onUpdate?: (value: any) => void;
  minDate?: string;
  maxDate?: string;
  placeHolder?: string;
  isRequired?: boolean;
  mode?: string;
  onOpen?: () => void;
}

const FormikDatepickerComponent = (props: FormikDatepickerComponentProps) => {
  const {
    labelText,
    formikField,
    onUpdate,
    minDate,
    maxDate,
    errorText,
    placeHolder,
    onOpen,
  } = props;
  const {field, form} = formikField;
  const isRequired = props.isRequired !== undefined ? props.isRequired : true;
  const showLabel =
    props.showLabel !== undefined
      ? props.showLabel
      : !!(labelText && labelText.length > 0);
  // const mode = props.mode || 'DateMonthYear';
  const baseStyle = props.baseStyle || {};
  const errorContainerStyle = props.errorContainerStyle || {};
  const [selected, setSelected] = useState<string>(field.value);

  useEffect(() => {
    setSelected(field.value);
  }, [field.value]);

  const hasError =
    form.touched[field.name] && form.errors && form.errors[field.name];
  const style: any = props.style || {};

  return (
    <View style={[styles.inputBaseWrapper, baseStyle]}>
      {showLabel && (
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
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
          style={{
            flex: 1,
          }}>
          <DatePickerComponent
            style={{borderColor: hasError ? Colors.warn : Colors.borderColor}}
            placeHolder={placeHolder}
            date={selected}
            minDate={minDate}
            maxDate={maxDate}
            onChange={value => {
              setSelected(value);
              form.setFieldTouched(field.name, true);
              form.setFieldValue(field.name, value);
              if (onUpdate) {
                onUpdate(value);
              }
            }}
            onOpen={() => {
              if (onOpen) {
                onOpen();
              }
            }}
          />
        </View>
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
    // opacity: 0.8,
    color: Colors.textLight,
  },
  baseErrorContainerStyle: {
    top: -12,
  },

  inputWrapper: {
    marginTop: 0,
  },
  input: {
    height: 40,
    // borderRadius: 10,
    width: '100%',
    paddingHorizontal: 0,
    color: Colors.textDark,
    // backgroundColor: Colors.backgroundColor,
    fontFamily: FontConfig.Lato.regular,
    fontSize: 16,
  },
  errorContainer: {
    marginTop: -5,
    position: 'absolute',
    right: 0,
  },
  errorText: {
    fontFamily: FontConfig.Lato.regular,
    color: Colors.warn,
    fontSize: 13,
    textTransform: 'capitalize',
  },
});

export default FormikDatepickerComponent;
