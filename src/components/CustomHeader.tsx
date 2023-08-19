import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'red'}}>header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 50,
    elevation: 10,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: 'black',
  },
});

export default CustomHeader;
