/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Image } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { imageFiles, fontFiles } from './assets/assets';
import MainScreen from './src/MainScreen';
import DetailScreen from './src/DetailScreen';
import AlbumScreen from './src/AlbumScreen.js';

const Stack = createStackNavigator();

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

const loadAssetsAsync = async () => {
  const imageAssets = cacheImages(imageFiles);
  const fontAssets = cacheFonts(fontFiles);
  await Promise.all([...imageAssets, ...fontAssets]);
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerBackTitleVisible: false,
          headerTitle: '',
          headerTintColor: 'rgb(233, 142, 23)',
        }}>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Album"
          component={AlbumScreen}
          options={{
            headerTransparent: true,
            headerTintColor: 'rgb(255, 255, 255)',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
