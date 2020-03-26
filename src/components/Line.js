import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  line: {
    backgroundColor: 'rgb(232, 232, 232)',
    height: 1,
    width: '100%',
  },
});

const Line = ({ style }) => {
  return <View style={[styles.line, style]} />;
};

export default Line;
