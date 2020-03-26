import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Line from './Line';

const itemWidth = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'rgb(233, 142, 23)',
    paddingHorizontal: 20,
    fontFamily: 'drboran',
  },
  detailText: {
    fontSize: 16,
    color: 'black',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 10,
    paddingRight: 5,
  },
  itemContainer: {
    width: itemWidth,
    marginRight: 15,
  },
  itemPicture: {
    width: '100%',
    height: 185,
    backgroundColor: 'grey',
  },
  line2: {
    marginTop: 20,
  },
});

const Item = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={onPress}
      activeOpacity={0.7}>
      <Image style={styles.itemPicture} source={item} />
    </TouchableOpacity>
  );
};

const AlbumItem = ({ place, onPicturePress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{place.name}</Text>
      <FlatList
        decelerationRate="fast"
        snapToInterval={itemWidth + 15}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        data={place.pictures}
        renderItem={({ item, index }) => (
          <Item item={item} onPress={() => onPicturePress(index, place)} />
        )}
        keyExtractor={(_, index) => `${index}`}
      />
      {place.detail && <Text style={styles.detailText}>{place.detail}</Text>}
      <Line style={styles.line2} />
    </View>
  );
};

export default AlbumItem;
