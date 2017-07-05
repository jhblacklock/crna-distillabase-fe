import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { Components } from 'expo';
const { MapView } = Components;

@connect(data => DistilleryMapScreen.getDataProps(data))
export default class DistilleryMapScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  static getDataProps(data) {
    return {
      distilleries: data.distilleries.all,
    };
  }

  render() {
    let { distilleries } = this.props;

    return (
      <View style={{flex: 1}}>
        <MapView
          style={styles.map}
          loadingBackgroundColor="#f9f5ed"
          showsUserLocation
          initialRegion={{
            latitude: 49.28827,
            longitude: -123.0977,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}>
          {
            this.props.distilleries.map(distillery => {
              let { latitude, longitude, name, isOpen } = distillery;

              return (
                <MapView.Marker
                  key={name}
                  pinColor={isOpen ? 'green' : 'red'}
                  coordinate={{latitude, longitude}}
                  title={name}
                />
              );
            })
          }
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
