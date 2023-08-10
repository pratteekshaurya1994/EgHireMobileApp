import React, {useEffect, useState, PropsWithChildren} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {CustomButton} from '../../components/core';
import {Colors, FontConfig} from '../../constants';
import colors from '../../constants/Colors';
import CountDown from 'react-native-countdown-component';

export interface OTPComponentProps {
  style?: StyleProp<ViewStyle>;
  onComplete: (otp: string) => void;
  onCancel?: () => void;
  resendOtp: (otp: string) => void;
  otp?: string;
  disableCancel?: boolean;
  isLoading?: boolean;
  rootStyle?: StyleProp<ViewStyle>;
  wrapper?: StyleProp<ViewStyle>;
  hideButton?: boolean;
}

const CELL_COUNT = 4;
const OTPComponent = (props: PropsWithChildren<OTPComponentProps>) => {
  const {onComplete, otp, rootStyle, isLoading, resendOtp, hideButton} = props;
  const [value, setValue] = useState<any>('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [otpProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [timerCount, setTimerCount] = useState(60);

  let Timer = () => {
    setTimerCount(60);
    CountDownTime();
    resendOtp(value);
  };

  let CountDownTime = () => {
    let interval = setInterval(() => {
      setTimerCount(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      CountDownTime();
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (otp) {
        setValue(otp);
      }
    }
    return () => {
      isSubscribed = false;
    };
  }, [otp]);

  return (
    <View
      style={[
        styles.container,
        {
          height: hideButton ? 250 : 180,
        },
      ]}>
      <View>
        <CodeField
          testID={'barcode_input'}
          ref={ref}
          {...otpProps}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={[styles.codeFieldRoot]}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell, rootStyle]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <View style={styles.container2}>
          {timerCount !== 0 ? (
            <View style={styles.countdownContainer}>
              <Text style={styles.resendOtpText}>Resend OTP in</Text>
              <CountDown
                style={{marginTop: 3}}
                until={60}
                digitTxtStyle={styles.countdownDigitTxtStyle}
                digitStyle={styles.countdownDigitStyle}
                size={15}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
              />
            </View>
          ) : (
            <TouchableOpacity onPress={Timer}>
              <Text style={styles.resendOtpText}>Resend OTP in</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {!hideButton && (
        <View style={styles.buttonWrapper}>
          <CustomButton
            testID={'proceed_btn'}
            title={'Submit'}
            isLoading={isLoading}
            onPress={() => {
              onComplete(value);
            }}
            // @ts-ignore
            style={[styles.submitButtonStyle]}
            disabled={value.length < 4}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  container2: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeFieldRoot: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#00000000',
  },
  cell: {
    width: 45,
    height: 45,
    lineHeight: 38,
    marginHorizontal: 6,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: Colors.textLight,
    textAlign: 'center',
    color: Colors.primary,
  },
  focusCell: {
    borderColor: Colors.textDark,
  },

  resendOtpText: {
    fontSize: 14,
    fontFamily: FontConfig.Lato.bold,
    marginTop: 5,
    color: colors.primary,
  },
  countdownDigitTxtStyle: {
    color: Colors.textDark,
    fontFamily: FontConfig.Lato.bold,
  },
  countdownDigitStyle: {
    backgroundColor: '#00000000',
    height: 20,
    width: 20,
  },
  resendOtpButton: {
    color: Colors.primary,
    fontSize: 14,
    marginTop: 5,
    fontFamily: FontConfig.Lato.bold,
  },
  submitButtonStyle: {
    backgroundColor: colors.primary,
    marginBottom: 0,
    borderRadius: 100,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
});

export default OTPComponent;
