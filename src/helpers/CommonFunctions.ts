import {Dimensions, Linking, Platform} from 'react-native';
import {Colors} from '../constants';

const isAndroid = () => {
  return Platform.OS === 'android';
};

const isIOS = () => {
  return Platform.OS === 'ios';
};

const getWidth = (screen: 'screen' | 'window' = 'screen') => {
  return Dimensions.get(screen).width;
};
const getHeight = (screen: 'screen' | 'window' = 'screen') => {
  return Dimensions.get(screen).height;
};

const openLink = (link: string) => {
  Linking.canOpenURL(link)
    .then(supported => {
      if (!supported) {
        console.log('Cant handle url');
      } else {
        return Linking.openURL(link);
      }
    })
    .catch(err => {
      console.log('An error occurred', err);
    });
};

const openSMS = (phone: string, SMSText: string) => {
  const url =
    Platform.OS === 'android' ? `sms:${phone}?body=${SMSText}` : `sms:${phone}`;
  openLink(url);
};
const openCall = (phoneNumber: string) => {
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phoneNumber}`;
  } else {
    phoneNumber = `tel:${phoneNumber}`;
  }
  openLink(phoneNumber);
};
const getElevationStyle = (
  elevation: number,
  shadowColor: string = Colors.shadowColor,
) => {
  return {
    elevation,
    shadowColor,
    shadowOffset: {width: 0, height: 0.5 * elevation},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
  };
};
const chatPhoneNumber = '+91XXXXXXXXXX';
const openWhatsAppChat = () => {
  const url = `whatsapp://send?text=&phone=${chatPhoneNumber}`;
  return Linking.openURL(url);
};

export default {
  isAndroid,
  isIOS,
  getWidth,
  getHeight,
  openLink,
  openSMS,
  openCall,
  getElevationStyle,
  openWhatsAppChat,
};

export class CommonFunctions {}
