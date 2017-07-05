import {
  Platform,
} from 'react-native';
import {
  Location,
  Permissions,
} from 'expo';
import geolib from 'geolib';

import Actions from '../state/Actions';

export default async function computeDistancesAsync({dispatch, getState}) {
  let { distilleries } = getState();
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') { return; }

  let { coords } = await Location.getCurrentPositionAsync({
    enableHighAccuracy: Platform.OS === 'ios',
  });

  let distilleriesWithDistances = distilleries.all.map(distillery => {
    let distanceM = geolib.getDistance(
      {latitude: coords.latitude, longitude: coords.longitude},
      {latitude: distillery.latitude, longitude: distillery.longitude},
    );

    let distanceKm = (distanceM / 1000.0).toFixed(2);
    let formattedDistance = `${distanceKm}km`;

    let direction = geolib.getCompassDirection(
      {latitude: coords.latitude, longitude: coords.longitude},
      {latitude: distillery.latitude, longitude: distillery.longitude},
    );

    return distillery.
      set('distance', formattedDistance).
      set('direction', direction);
  });


  let nearbyDistilleries = distilleriesWithDistances.
    sortBy(distillery => distillery.distance).
    map(distillery => distillery.id);

  dispatch(Actions.setDistilleries(distilleriesWithDistances));
  dispatch(Actions.setNearbyDistilleries(nearbyDistilleries));
}
