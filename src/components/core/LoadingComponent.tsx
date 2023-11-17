import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, ViewStyle, Animated, Easing} from 'react-native';

export interface LoadingComponentProps {
  backgroundColor?: string;
  style?: ViewStyle;
  isNormal?: boolean;
}

const LoadingComponent = (props: LoadingComponentProps) => {
  const backgroundColor = props.backgroundColor || 'white';
  const style = props.style || {};

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    spinAnimation.start();

    return () => {
      spinAnimation.stop();
    };
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.screen, style, {backgroundColor}]}>
      <Animated.View style={[styles.container, {transform: [{rotate: spin}]}]}>
        <View style={[styles.circle, styles.circleOne]} />
        <View style={[styles.circle, styles.circleTwo]} />
        <View style={[styles.circle, styles.circleThree]} />
        <View style={[styles.circle, styles.circleFour]} />
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  circleOne: {
    backgroundColor: '#e07208',
  },
  circleTwo: {
    backgroundColor: '#feb019',
  },
  circleThree: {
    backgroundColor: '#20e431',
  },
  circleFour: {
    backgroundColor: '#40b1b8',
  },
});
export default LoadingComponent;

// import React from 'react';
// import {View, StyleSheet, Text} from 'react-native';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withRepeat,
//   withSpring,
// } from 'react-native-reanimated';
// import {Colors} from '../../constants';
// const width = 40;
// const height = 40;
// const LoadingComponent = () => {
//   const scale = useSharedValue(1);

//   // Start the pulsating animation
//   scale.value = withRepeat(
//     withSpring(0.9, {stiffness: 100, damping: 10}),
//     -1, // Repeat indefinitely
//     true, // Reverse the animation on each repeat
//   );

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{scale: scale.value}],
//     };
//   });

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.loader, animatedStyle]}>
//         <View style={styles.loader2}>
//           <View style={styles.loader3} />
//         </View>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loader: {
//     width: width,
//     height: height,
//     borderRadius: 200,
//     backgroundColor: Colors.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loader2: {
//     width: width - 10,
//     height: height - 10,
//     borderRadius: 200,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loader3: {
//     width: width - 20,
//     height: height - 20,
//     borderRadius: 200,
//     backgroundColor: Colors.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default LoadingComponent;
