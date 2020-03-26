import React from 'react';
import {
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import bgGragient from '../../assets/bg-gradient.png';

const itemHeight = ((Dimensions.get('window').width - 40) * 1110) / 1005;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: itemHeight,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  background: { flex: 1, justifyContent: 'flex-end' },
  content: {
    height: (itemHeight * 40) / 100,
    paddingHorizontal: 15,
    paddingBottom: 30,
    overflow: 'visible',
    justifyContent: 'flex-end',
  },
  titleText: {
    fontSize: 30,
    color: 'rgb(255, 193, 19)',
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontFamily: 'drboran',
  },
  subTitleText: { fontSize: 15, color: 'rgb(209, 209, 214)' },
});

const MainItem = ({ wat, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}>
      <ImageBackground style={styles.background} source={wat.thumbnail}>
        <ImageBackground style={styles.content} source={bgGragient}>
          <Text style={styles.titleText}>{wat.title}</Text>
          <Text style={styles.subTitleText}>{wat.subTitle}</Text>
        </ImageBackground>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default MainItem;
