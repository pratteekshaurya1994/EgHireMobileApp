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
import CardButtonComponent from './CardButtonComponent';

export interface CardButtonType {
  id: string | number | boolean;
  title: string;
  disabled?: boolean;
}

export interface FormikCardGroupComponentProps {
  cardButtons: CardButtonType[];
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
  CardStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  formikField: FieldProps;
  onUpdate?: (value: any) => void;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  isRequired?: boolean;
  labelTextStyle?: StyleProp<TextStyle>;
}

const FormikCardGroupComponent = (props: FormikCardGroupComponentProps) => {
  const {
    labelText,
    CardStyle,
    cardButtons,
    formikField,
    onUpdate,
    errorText,
    labelTextStyle,
  } = props;
  const {field, form} = formikField;
  const direction = props.direction || 'row';
  const showLabel =
    props.showLabel !== undefined
      ? props.showLabel
      : !!(labelText && labelText.length > 0);
  const baseStyle = props.baseStyle || {};
  const errorContainerStyle = props.errorContainerStyle || {};
  const [selectedCard, setSelectedCard] = useState<
    string | number | boolean | undefined
  >(field.value);

  const isRequired = props.isRequired !== undefined ? props.isRequired : true;

  useEffect(() => {
    setSelectedCard(field.value);
  }, [field.value]);

  const hasError =
    form.touched[field.name] && form.errors && form.errors[field.name];
  const style: any = props.style || {};

  return (
    <View style={[styles.inputBaseWrapper, baseStyle]}>
      {showLabel && (
        <View style={styles.labelWrapper}>
          <LabelComponent
            title={labelText || ''}
            style={{marginBottom: 10}}
            textStyle={labelTextStyle}
          />
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
            styles.CardComponentWrapper,
            props.buttonStyle,
            {flexDirection: direction},
          ]}>
          {cardButtons &&
            cardButtons.map(CardButton => {
              return (
                <CardButtonComponent
                  disabled={CardButton.disabled}
                  style={[
                    {
                      marginBottom: 6,
                      alignItems: 'center',
                    },
                    CardStyle,
                  ]}
                  checked={selectedCard === CardButton.id}
                  key={CardButton.id + '_' + CardButton.title}
                  label={CardButton.title}
                  onChange={value => {
                    if (!CardButton.disabled) {
                      setSelectedCard(value);
                      form.setFieldTouched(field.name, true);
                      form.setFieldValue(field.name, value);
                      if (onUpdate) {
                        onUpdate(value);
                      }
                    }
                  }}
                  value={CardButton.id}
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
  CardComponentWrapper: {
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

export default FormikCardGroupComponent;
