import React from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import MainItem from './components/MainItem';
import mainBackground from '../assets/main-bg.jpg';
import { wats } from './data';

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
  container: { flex: 1 },
  content: { padding: 20 },
  headerText: {
    fontSize: 24,
    color: 'rgb(185, 106, 0)',
    textShadowColor: 'rgb(255, 164, 10)',
    textShadowOffset: { width: 0.3, height: 0.3 },
    textShadowRadius: 0,
    fontFamily: 'drboran',
  },
});

const MainScreen = ({ navigation }) => {
  const onPressItem = (wat) => {
    navigation.navigate('Detail', { wat });
  };

  return (
    <ImageBackground style={styles.background} source={mainBackground}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}>
          <Text style={styles.headerText}>ท่องเที่ยวสายวัฒนธรรม</Text>
          {wats.map((wat) => (
            <MainItem
              key={wat.title}
              wat={wat}
              onPress={() => onPressItem(wat)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MainScreen;
