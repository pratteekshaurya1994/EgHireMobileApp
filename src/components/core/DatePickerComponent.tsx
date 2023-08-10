import React, {useCallback, useEffect, useState} from 'react';
import {
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Keyboard,
} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import {Colors, FontConfig} from '../../constants';
import {CommonFunctions} from '../../helpers';
import CustomButton from './CustomButton';
import LabelComponent from './LabelComponent';
// import {TouchableNativeFeedback} from 'react-native-gesture-handler';

export interface DatePickerComponentProps {
  date?: string;
  minDate?: string;
  maxDate?: string;
  onChange?: (date: string) => void;
  labelText?: string;
  placeHolder?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  onOpen?: () => void;
}

const currentDate = Moment();

const DatePickerComponent = (props: DatePickerComponentProps) => {
  const {
    date,
    maxDate,
    minDate,
    onChange,
    labelText,
    placeHolder,
    style,
    testID,
    onOpen,
  } = props;
  const [datepickerShow, setDatepickerShow] = useState(false);
  const [changedDate, setChangedDate] = useState<string | null>(null);

  const [dateConstraints, setDateConstraints] = useState({});

  // maximumDate:{(mode === 'max' ? maxDate.toDate() : pickerMaxDate.toDate())}
  // minimumDate:{(mode === 'max' ? pickerMinDate.toDate() : minDate.toDate())}
  const calcDateConstraints = useCallback(() => {
    const constraints: any = {};

    if (maxDate) {
      constraints.maximumDate = Moment(maxDate).toDate();
    }
    if (minDate) {
      constraints.minimumDate = Moment(minDate).toDate();
    }
    setDateConstraints(constraints);
  }, [maxDate, minDate]);
  useEffect(() => {
    calcDateConstraints();
  }, [minDate, maxDate, calcDateConstraints]);

  useEffect(() => {
    if (date) {
      setChangedDate(date || '');
    }
  }, [date]);

  // const changedDate = getDate();

  // useEffect(() => {
  //   Keyboard.dismiss;
  // }, []);

  const getDatePicker = (
    display:
      | 'default'
      | 'compact'
      | 'inline'
      | 'spinner'
      | 'clock'
      | 'calendar' = 'default',
  ) => {
    Keyboard.dismiss;
    console.log('opened');
    return (
      <RNDateTimePicker
        themeVariant="light"
        value={
          changedDate
            ? Moment(changedDate, 'YYYY-MM-DD').toDate()
            : currentDate.toDate()
        }
        {...dateConstraints}
        textColor={
          CommonFunctions.isAndroid() ? Colors.textOnPrimary : Colors.textDark
        }
        mode={'date'}
        display={display}
        style={{
          flex: 1,
          width: '100%',
          zIndex: 20000,
          backgroundColor: Colors.backgroundColor,
        }}
        onChange={(e: any, value: Moment.MomentInput) => {
          // console.log(e);
          setDatepickerShow(CommonFunctions.isIOS());
          if (value) {
            const curDate = Moment(value).format('YYYY-MM-DD');
            setChangedDate(curDate);
            if (onChange) {
              onChange(curDate);
            }
          }
        }}
      />
    );
  };

  const openDatePicker = () => {
    setDatepickerShow(true);
    if (onOpen) {
      onOpen();
    }
  };

  return (
    <>
      {datepickerShow && (
        <>
          {CommonFunctions.isAndroid() && getDatePicker()}
          {CommonFunctions.isIOS() && (
            <Modal
              animationType="fade"
              transparent
              visible={datepickerShow}
              presentationStyle="overFullScreen">
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  justifyContent: 'flex-end',
                  flexDirection: 'column',
                  // zIndex: 10000,
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 15,
                    paddingBottom: 40,
                    flex: 1,
                    // zIndex: 10000,
                  }}>
                  {getDatePicker('spinner')}
                  <View style={{alignItems: 'center'}}>
                    <CustomButton
                      class={'primary'}
                      autoWidth={true}
                      style={{paddingHorizontal: 20}}
                      title={'Done'}
                      onPress={() => {
                        setDatepickerShow(false);
                      }}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </>
      )}
      <View style={{}}>
        {!!labelText && <LabelComponent title={labelText} />}
        <TouchableOpacity testID={testID} onPress={() => openDatePicker()}>
          <View style={[styles.date, style]}>
            <View style={{flex: 1}}>
              {!!changedDate && (
                <Text style={[styles.dateText]}>{changedDate}</Text>
              )}
              {!changedDate && (
                <Text style={[styles.dateText, {color: '#8B8E9080'}]}>
                  {placeHolder || 'Select Date'}
                </Text>
              )}
            </View>
            {/* <ImageConfig.IconDatePicker
              style={{marginRight: 15}}
              width={24}
              color={Colors.textLight}
            /> */}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  date: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.borderColor,
    borderRadius: 5,
  },

  dateText: {
    fontFamily: FontConfig.Lato.regular,
    paddingHorizontal: 10,
    color: Colors.textDark,
    fontSize: 15,
  },
});

export default DatePickerComponent;
