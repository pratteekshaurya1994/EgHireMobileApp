import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {Colors, FontConfig} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/FontAwesome5';

export interface CustomButtonProps {
  title: string;
  isLoading?: boolean;
  showLoading?: boolean;
  loadingPercent?: number;
  class?: 'primary' | 'secondary';
  type?: 'normal' | 'outline';
  disabled?: boolean;
  icon?: any;
  iconPosition?: 'left' | 'right';
  iconStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  autoWidth?: boolean;
  touchProps?: TouchableOpacityProps;
  ImageConfigCall?: boolean;
  ImageConfigSMS?: boolean;
  ImageConfigCheck?: boolean;
  ImageConfigMap?: boolean;
  ImageConfigList?: boolean;
  ImageConfigFilter?: boolean;
  testID?: string;
}

const CustomButton = (props: CustomButtonProps) => {
  const title = props.title;
  const testID = props.testID;
  const onPress = props.onPress;
  const touchProps = props.touchProps || {};
  const style = props.style || {};
  const textStyle = props.textStyle || {};
  const autoWidth = props.autoWidth === undefined ? false : props.autoWidth;
  const touchWidth: any = autoWidth ? {} : {width: '100%'};

  const isLoading = props.isLoading || false;
  const showLoading = props.showLoading || false;
  const loadingPercent = props.loadingPercent || 0;
  const disabled = props.disabled || isLoading;
  const ShowIcon = props.icon || undefined;

  const disabledStyle = disabled ? styles.disabled : {};

  const iconPosition = props.iconPosition || 'right';

  const btnClass = props.class || 'primary';
  const type = props.type || 'normal';

  const borderColor =
    btnClass === 'primary' ? Colors.primary : Colors.borderColor;
  const textColor =
    type === 'normal'
      ? btnClass === 'primary'
        ? Colors.textOnPrimary
        : Colors.textDark
      : btnClass === 'primary'
      ? Colors.primary
      : Colors.textDark;
  const getIcon = () => {
    if (ShowIcon === 'whatsapp') {
      return (
        // <Icon
        //   name={ShowIcon}
        //   color={Colors.black}
        //   size={20}
        //   style={[styles.iconDefaults, {}]}
        // />
        <></>
      );
    } else {
      return <></>;
    }
  };
  const onPressHandler = () => {
    if (onPress && !disabled) {
      onPress();
    }
  };
  const getOutlineBtn = (cls: string) => {
    return (
      <View
        style={[
          styles.buttonOutline,
          {borderColor: borderColor},
          style,
          disabledStyle,
        ]}>
        <TouchableOpacity
          testID={testID}
          activeOpacity={disabled ? 1 : 0.6}
          {...touchProps}
          disabled={disabled}
          style={styles.touchBtn}
          onPress={onPressHandler}>
          {isLoading && (
            <ActivityIndicator
              color={cls === 'primary' ? Colors.primary : Colors.textDark}
              size={'large'}
            />
          )}
          {!isLoading && (
            <>
              {(iconPosition === 'left' && getIcon()) || getIcon()}

              <Text
                numberOfLines={1}
                style={[
                  styles.buttonCommonText,
                  {color: textColor},
                  textStyle,
                  // icon
                  //   ? iconPosition === 'left'
                  //     ? {marginLeft: 5}
                  //     : {marginRight: 5}
                  //   : {},
                ]}>
                {title}
              </Text>
              {(iconPosition === 'right' && getIcon()) || getIcon()}
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  const getLoadingBar = () => {
    return (
      <View style={[styles.progressBarHolder, {}]}>
        <View style={[styles.progressBar, {width: `${loadingPercent}%`}]} />
      </View>
    );
  };
  return (
    <>
      {btnClass === 'primary' && type === 'normal' && (
        <LinearGradient
          colors={disabled ? ['#CACACA', '#BDBDBD'] : ['#10C4D3', '#4FE6AF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0.42, 0.67]}
          style={[styles.button, styles.buttonPrimary, style, disabledStyle]}>
          <TouchableOpacity
            testID={testID}
            activeOpacity={disabled ? 1 : 0.6}
            {...touchProps}
            disabled={disabled}
            style={[styles.touchBtn, touchWidth]}
            onPress={onPressHandler}>
            {isLoading && (
              <ActivityIndicator color={Colors.textOnPrimary} size={'large'} />
            )}
            {!isLoading && (
              <>
                {iconPosition === 'left' && getIcon()}
                <Text
                  numberOfLines={1}
                  style={[
                    styles.buttonCommonText,
                    styles.buttonText,
                    textStyle,
                  ]}>
                  {title}
                </Text>
                {(iconPosition === 'right' && getIcon()) || getIcon()}
              </>
            )}
          </TouchableOpacity>
        </LinearGradient>
      )}
      {btnClass === 'secondary' && type === 'normal' && (
        <View
          style={[
            styles.button,
            styles.buttonSecondary,
            style,
            disabledStyle,
            disabled
              ? {
                  backgroundColor: '#CACACA',
                  borderColor: '#CACACA',
                }
              : {},
          ]}>
          <TouchableOpacity
            testID={testID}
            activeOpacity={disabled ? 1 : 0.6}
            {...touchProps}
            disabled={disabled}
            style={[styles.touchBtn, touchWidth]}
            onPress={onPressHandler}>
            {isLoading && (
              <ActivityIndicator color={Colors.textOnPrimary} size={'large'} />
            )}
            {!isLoading && (
              <>
                {(iconPosition === 'left' && getIcon()) || getIcon()}
                <Text
                  style={[
                    styles.buttonCommonText,
                    styles.buttonSecondaryText,
                    textStyle,
                    disabled ? {color: '#FFF'} : {},
                    // icon
                    //   ? iconPosition === 'left'
                    //     ? {marginLeft: 5}
                    //     : {marginRight: 5}
                    //   : {},
                  ]}>
                  {title}
                </Text>
                {(iconPosition === 'right' && getIcon()) || getIcon()}
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
      {btnClass === 'primary' && type === 'outline' && getOutlineBtn('primary')}
      {btnClass === 'secondary' &&
        type === 'outline' &&
        getOutlineBtn('secondary')}
      {isLoading && showLoading && getLoadingBar()}
    </>
  );
};

const styles = StyleSheet.create({
  progressBarHolder: {
    backgroundColor: '#EEE',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 6,
    borderRadius: 8,
  },

  progressBar: {
    // color: '#0dd2b9',
    backgroundColor: Colors.accent,
    width: '0%',
    height: 5,
    borderRadius: 8,
  },
  buttonOutline: {
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 5,
    flex: 0,
    height: 50,
    // width: '100%',
    // paddingVertical: 15,
    // flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: Colors.borderColor,
    borderColor: Colors.borderColor,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  buttonSecondary: {
    borderColor: Colors.primary,
    backgroundColor: Colors.backgroundColor,
    borderWidth: 1,
  },

  buttonCommonText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: FontConfig.Lato.bold,
    textTransform: 'uppercase',
  },
  buttonText: {
    color: '#ffffff',
  },
  buttonSecondaryText: {
    color: Colors.textDark,
  },
  iconDefaults: {marginHorizontal: 5},
  touchBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 59,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingHorizontal: 20,
  },
});

export default CustomButton;
