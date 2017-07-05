import { AsyncStorage } from 'react-native';

const Keys = {
  User: 'GrowlerUser',
  VisitedDistilleries: 'GrowlerVisited',
};

async function getUserAsync() {
  let results = await AsyncStorage.getItem(Keys.User);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function saveUserAsync(user) {
  return AsyncStorage.setItem(Keys.User, JSON.stringify(user));
}

function removeUserAsync() {
  return AsyncStorage.removeItem(Keys.User);
}

function saveVisitedDistilleriesAsync(distilleryIds) {
  return AsyncStorage.setItem(Keys.VisitedDistilleries, JSON.stringify(distilleryIds));
}

async function getVisitedDistilleriesAsync() {
  let results = await AsyncStorage.getItem(Keys.VisitedDistilleries);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function clearAllAsync() {
  return AsyncStorage.clear();
}

export default {
  saveUserAsync,
  getUserAsync,
  removeUserAsync,
  saveVisitedDistilleriesAsync,
  getVisitedDistilleriesAsync,
  clearAllAsync,
};
