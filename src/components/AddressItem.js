import React from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, Text, Linking, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 40,
  },
  map: {
    width: '100%',
    height: 190,
  },
  addressText: {
    fontSize: 16,
    color: 'black',
    marginTop: 20,
  },
});

const AddressItem = ({ wat }) => {
  const onMarkerPress = (lat, lng) => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lng}`;
    const label = wat.title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        camera={{
          center: {
            latitude: wat.location.lat,
            longitude: wat.location.long,
          },
          pitch: 0,
          heading: 0,
          altitude: 5000,
          zoom: 13,
        }}>
        <MapView.Marker
          title={wat.title}
          coordinate={{
            latitude: wat.location.lat,
            longitude: wat.location.long,
          }}
          onPress={() => onMarkerPress(wat.location.lat, wat.location.long)}
        />
      </MapView>
      <Text style={styles.addressText}>{wat.address}</Text>
    </View>
  );
};

export default AddressItem;
