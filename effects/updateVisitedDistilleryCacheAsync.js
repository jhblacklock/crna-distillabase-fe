import LocalStorage from '../state/LocalStorage';

export default function updateVisitedCacheAsync({getState}) {
  let { distilleries } = getState();
  let { visited } = distilleries;

  LocalStorage.saveVisitedDistilleriesAsync(visited.toJS());
}
