import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import OTPInputBox from '../../components/CustomOtpCOmponent';

const CustomOTPComponent = () => {
  const otpInputRef = useRef(null);
  const [otpValue, setOTPValue] = useState('');

  const handleOTPChange = (otp: any) => {
    setOTPValue(otp);
  };

  return (
    <View>
      <OTPInputBox
        ref={otpInputRef}
        onOTPChange={handleOTPChange}
        numInputs={4}
        containerStyle={{}}
      />
      <Text style={{color: 'red'}}>Entered OTP: {otpValue}</Text>
    </View>
  );
};

export default CustomOTPComponent;
