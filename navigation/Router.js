import {
  createRouter,
} from '@expo/ex-navigation';

import AuthenticationScreen from '../screens/AuthenticationScreen';
import DistilleryDetailsScreen from '../screens/DistilleryDetailsScreen';
import DistilleryListScreen from '../screens/DistilleryListScreen';
import DistilleryMapScreen from '../screens/DistilleryMapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TabNavigationLayout from './TabNavigationLayout';

export default createRouter(() => ({
  authentication: () => AuthenticationScreen,
  details: () => DistilleryDetailsScreen,
  list: () => DistilleryListScreen,
  map: () => DistilleryMapScreen,
  settings: () => SettingsScreen,
  tabNavigation: () => TabNavigationLayout,
}), {
  ignoreSerializableWarnings: true,
});
