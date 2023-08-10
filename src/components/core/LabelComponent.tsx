import React from 'react';
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  TouchableOpacity,
} from 'react-native';
import {Colors, FontConfig} from '../../constants';

export interface LabelComponentProps {
  title: string;
  supportingTitle?: string;
  style?: StyleProp<FlexStyle>;
  textStyle?: StyleProp<TextStyle>;
  supportingTextStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const LabelComponent = (props: LabelComponentProps) => {
  const {
    title,
    supportingTitle,
    style,
    textStyle,
    supportingTextStyle,
    onPress,
  } = props;
  // console.log('supportingTitle>', supportingTitle);

  return (
    <View style={[styles.label, style]}>
      <Text style={[styles.labelText, textStyle]}>{title}</Text>
      {supportingTitle != undefined && (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.labelText, supportingTextStyle]}>
            {supportingTitle}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  labelText: {
    fontFamily: FontConfig.Lato.regular,
    color: Colors.textLight,
    fontSize: 14,
  },
});

export default LabelComponent;
