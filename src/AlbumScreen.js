import React, { useState, useRef } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';

const itemWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  list: {
    flex: 1,
  },
  itemImage: {
    width: itemWidth,
    height: Dimensions.get('window').height,
    marginRight: 15,
  },
  countText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'white',
    marginBottom: 40,
  },
});

const Item = ({ item }) => {
  return (
    <ScrollView
      style={styles.itemImage}
      bouncesZoom={false}
      minimumZoomScale={1}
      maximumZoomScale={5}>
      <Image style={styles.itemImage} source={item} resizeMode="contain" />
    </ScrollView>
  );
};

const AlbumScreen = ({ route }) => {
  const { index, place } = route.params;
  const [currentIndex, setCurrentIndex] = useState(index);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length !== 0) {
      console.log(viewableItems[0].index);
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      <FlatList
        initialScrollIndex={index}
        style={styles.list}
        horizontal={true}
        data={place.pictures}
        decelerationRate="fast"
        snapToInterval={itemWidth + 15}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(_, index) => `${index}`}
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
      <Text style={styles.countText}>
        {currentIndex + 1}/{place.pictures.length}
      </Text>
    </View>
  );
};

export default AlbumScreen;
