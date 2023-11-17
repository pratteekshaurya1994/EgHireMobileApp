import React, {
  PropsWithChildren,
  useRef,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Colors} from '../constants';

interface CustomAuthTopBarProps {
  setActiveTab: Dispatch<SetStateAction<Number>>;
  activeTab: Number;
  ContainerStyle?: StyleProp<ViewStyle>;
  TabContainerStyle?: StyleProp<ViewStyle>;
  TabTextStyle?: StyleProp<TextStyle>;
  tabsData: {title: string; index: number}[];
}

const CustomAuthTopBar = (props: PropsWithChildren<CustomAuthTopBarProps>) => {
  const tabsData = props.tabsData;
  const tabs = tabsData;
  const TabTextStyle = props.TabTextStyle;
  const {setActiveTab, activeTab} = props;
  const ContainerStyle = props.ContainerStyle;
  const TabContainerStyle = props.TabContainerStyle;
  const tabWidth: number = Dimensions.get('window').width / tabs?.length;

  const indicatorPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(indicatorPosition, {
      // @ts-ignore
      toValue: tabWidth * (activeTab - 1),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTab, tabWidth]);

  return (
    <View style={[styles.container, ContainerStyle]}>
      <View style={[styles.tabContainerStyle, TabContainerStyle]}>
        {tabs?.map(tab => (
          <TouchableOpacity
            key={tab.index}
            onPress={() => setActiveTab(tab.index)}
            style={[styles.tabStyle, {width: tabWidth}]}>
            <Text
              style={[
                TabTextStyle,
                styles.tabTextStyle,
                activeTab === tab.index && styles.activeTabTextStyle,
              ]}>
              {tab.title}
            </Text>
            <View
              style={[
                styles.bottomBorder,
                activeTab === tab.index && styles.activeTabBottomBorder,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <Animated.View
          style={[
            styles.indicator,
            {
              width: tabWidth,
              transform: [{translateX: indicatorPosition}],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  tabContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: 'black',
  },
  tabStyle: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabTextStyle: {
    color: Colors.textLight,
    fontSize: 16,
  },
  activeTabTextStyle: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  bottomBorder: {
    height: 2,
    backgroundColor: 'transparent',
  },
  activeTabBottomBorder: {
    backgroundColor: 'black',
  },
  indicator: {
    position: 'absolute',
    height: 2,
    backgroundColor: Colors.secondary,
    bottom: 0,
  },
});

export default CustomAuthTopBar;
