import { useState } from 'react';
import { PanResponder } from 'react-native';

const usePanResponder = (maxTabCount:any, setActiveTab:any) => {
  const [swipeRegistered, setSwipeRegistered] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dx } = gestureState;
      if (!swipeRegistered) {
        if (dx > 0) {
          setActiveTab((prevTab:any) => (prevTab === 1 ? prevTab : prevTab - 1));
        } else if (dx < 0) {
          setActiveTab((prevTab:any) => (prevTab === maxTabCount ? prevTab : prevTab + 1));
        }
        setSwipeRegistered(true);
      }
    },
    onPanResponderRelease: () => {
      setSwipeRegistered(false);
    },
  });

  return panResponder;
};

export {usePanResponder};
