import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from 'react-native';
import Line from './Line';
import playIcon from '../../assets/play.png';

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgb(233, 142, 23)',
    fontFamily: 'drboran',
  },
  detailText: {
    fontSize: 16,
    color: 'black',
    paddingTop: 10,
  },
  historyContainer: {
    padding: 20,
  },
  videoContainer: {
    width: '100%',
    height: 212,
  },
  overlayVideo: {
    width: '100%',
    height: 212,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContainer2: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  playIcon: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
  line1: { marginBottom: 10 },
  line2: { marginTop: 20 },
});

const Detailitem = ({ wat }) => {
  return (
    <View>
      <View style={styles.historyContainer}>
        <Text style={styles.headerTitle}>{wat.title}</Text>
        <Text style={[styles.detailText]}>{wat.detail}</Text>
      </View>
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={() => Linking.openURL(wat.video)}
        activeOpacity={0.7}>
        <ImageBackground style={styles.videoContainer} source={wat.headerImg}>
          <ImageBackground style={styles.overlayVideo}>
            <Image style={styles.playIcon} source={playIcon} />
          </ImageBackground>
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.historyContainer2}>
        <Line style={styles.line1} />
        <Text style={styles.headerTitle}>ประวัติ</Text>
        <Text style={styles.detailText}>{wat.history}</Text>
        <Line style={styles.line2} />
      </View>
    </View>
  );
};

export default Detailitem;