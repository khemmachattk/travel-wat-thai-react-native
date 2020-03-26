import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Animated,
  SafeAreaView,
} from 'react-native';

import mainBackground from '../assets/main-bg.jpg';
import Detailitem from './components/DetailItem';
import AddressItem from './components/AddressItem';
import AlbumItem from './components/AlbumItem';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 44,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 17,
  },
  headerImage: {
    height: 200,
    position: 'absolute',
    top: 0,
  },
  scroll: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: 64,
  },
  content: { paddingTop: 136 },
});

const DetailScreen = ({ route, navigation }) => {
  const { wat } = route.params;
  const [scrollY] = useState(new Animated.Value(0));

  const onPicturePress = (index, place) => {
    navigation.navigate('Album', { index, place });
  };

  return (
    <ImageBackground style={styles.container} source={mainBackground}>
      <Animated.Image
        scaleMode="cover"
        style={[
          styles.headerImage,
          {
            width: scrollY.interpolate({
              inputRange: [-8, 0, 1],
              outputRange: ['101%', '100%', '100%'],
            }),
            left: scrollY.interpolate({
              inputRange: [-5, 0, 1],
              outputRange: [-1, 0, 0],
            }),
            height: scrollY.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [201, 200, 199],
            }),
            opacity: scrollY.interpolate({
              inputRange: [-1, 0, 156],
              outputRange: [1, 1, 0],
            }),
          },
        ]}
        source={wat.headerImg}
      />
      <SafeAreaView>
        <Animated.View
          style={[
            styles.headerContainer,
            {
              opacity: scrollY.interpolate({
                inputRange: [-1, 0, 170, 175],
                outputRange: [0, 0, 0, 1],
              }),
            },
          ]}>
          <Animated.Text style={styles.headerTitle}>{wat.title}</Animated.Text>
        </Animated.View>
      </SafeAreaView>
      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        style={styles.scroll}
        contentContainerStyle={styles.content}>
        <Detailitem wat={wat} />
        {wat.places.map((place) => (
          <AlbumItem
            key={place.name}
            place={place}
            onPicturePress={onPicturePress}
          />
        ))}
        <AddressItem wat={wat} />
      </Animated.ScrollView>
    </ImageBackground>
  );
};

export default DetailScreen;
