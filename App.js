import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const App = () => {
  //24.8637223,67.0599263
  const [lat, setLat] = useState(24.9390817);
  const [lng, setLng] = useState(67.02875);
  const [rfid, setRfid] = useState('');

  useEffect(() => {
    getLastData();
  }, []);

  const getLastData = async () => {
    const response = await axios.get('http://192.168.43.7:8000');
    if (response.data) {
      console.log(response.data[0]);
      setLat(parseFloat(response.data[0].latitude));
      setLng(parseFloat(response.data[0].longitude));
      setRfid(response.data[0].rfid);
    }
  };

  return (
    <View style={styles.container}>
      {lat && lng ? (
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: lat,
            longitude: lng,
            // latitudeDelta: 0.015,
            latitudeDelta: 0.0043,
            // longitudeDelta: 0.0121,
            longitudeDelta: 0.0034,
          }}>
          <Marker
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}
            image={require('./src/assets/bus.png')}>
            <Callout>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Text>RFID {rfid}</Text>

                <Text>BUS no. APG_234</Text>
                <Text>No of Students: 23</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
      ) : (
        <View>HELLO</View>
      )}
    </View>
  );
};

export default App;
