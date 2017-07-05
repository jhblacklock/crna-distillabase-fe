import ActionTypes from './ActionTypes';
import { DistilleriesState, Distillery } from './Records';

class DistilleriesReducer {
  static reduce(state = new DistilleriesState(), action) {
    if (DistilleriesReducer[action.type]) {
      return DistilleriesReducer[action.type](state, action);
    } else {
      return state;
    }
  }

  static [ActionTypes.SET_DISTILLERIES](state, action) {
    let distilleries = action.distilleries.sortBy(distillery => distillery.name);
    return state.set('all', distilleries);
  }

  static [ActionTypes.SET_NEARBY_DISTILLERIES](state, action) {
    return state.set('nearby', action.distilleryIds);
  }

  static [ActionTypes.SET_VISITED_DISTILLERIES](state, action) {
    return state.set('visited', action.distilleryIds);
  }

  static [ActionTypes.ADD_VISITED_DISTILLERY](state, action) {
    let visited = state.visited.push(action.distilleryId);
    return state.set('visited', visited);
  }

  static [ActionTypes.REMOVE_VISITED_DISTILLERY](state, action) {
    let index = state.visited.indexOf(action.distilleryId);

    if (index === -1) {
      return state;
    }

    return state.set('visited', state.visited.delete(index));
  }
}

export default DistilleriesReducer.reduce;
