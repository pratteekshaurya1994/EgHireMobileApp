import React, {useCallback} from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Colors, FontConfig} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';

export interface CardButtonComponentProps {
  checked?: boolean;
  style?: StyleProp<ViewStyle>;
  value?: string | number | boolean;
  onChange?: (value: string | number | boolean | undefined) => void;
  label?: string;
  disabled?: boolean;
}

const CardButtonComponent = (props: CardButtonComponentProps) => {
  const {checked, onChange, value, label, disabled} = props;
  const style = props.style || {};

  const updateSelected = useCallback(
    (checked: boolean) => {
      if (onChange) {
        onChange(value);
      }
    },
    [onChange, value],
  );

  return (
    <LinearGradient
      colors={
        checked
          ? ['#FFA220', '#65FF67']
          : [Colors.textOnPrimary, Colors.textOnPrimary]
      }
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0.3, 0.59]}
      style={[styles.mainWrapper, style]}>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.9}
        onPress={() => {
          if (!disabled) {
            updateSelected(true);
          }
        }}>
        <Text
          style={{
            color: checked ? Colors.black : Colors.primary,
            fontFamily: FontConfig.NunitoSans.semiBold,
            paddingHorizontal: 5,
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 40,
    minWidth: 80,
    elevation: 10,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default CardButtonComponent;
