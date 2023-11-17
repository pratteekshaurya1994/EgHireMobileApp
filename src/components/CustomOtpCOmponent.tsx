import React, {useRef, useState, forwardRef, useImperativeHandle} from 'react';
import {View, TextInput, StyleSheet, StyleProp, ViewStyle} from 'react-native';

interface OTPInputBoxProps {
  onOTPChange: (otp: string) => void;
  numInputs: number;
  containerStyle?: StyleProp<ViewStyle>;
}

interface OTPInputBoxRef {
  focus: () => void;
}

const OTPInputBox = forwardRef<OTPInputBoxRef, OTPInputBoxProps>(
  ({onOTPChange, numInputs, containerStyle}, ref) => {
    const [otp, setOTP] = useState<string[]>(Array(numInputs).fill(''));
    const inputRefs = useRef<any[]>([]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRefs.current[0]?.focus();
      },
    }));

    const handleChange = (text: string, index: number) => {
      const newOTP = [...otp];
      newOTP[index] = text;
      setOTP(newOTP);
      onOTPChange(newOTP.join(''));
      if (text.length > 0) {
        focusNext(index);
      } else {
        focusPrev(index);
      }
    };

    const focusNext = (index: number) => {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const focusPrev = (index: number) => {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    return (
      <View style={[containerStyle, {flexDirection: 'row'}]}>
        {otp.map((value, index) => (
          <View>
            <TextInput
              key={index}
              ref={input => (inputRefs.current[index] = input)}
              value={value}
              onChangeText={text => handleChange(text, index)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
            />
          </View>
        ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ddd',
    width: 40,
    height: 40,
    borderRadius: 500,
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 10,
  },
});

export default OTPInputBox;
