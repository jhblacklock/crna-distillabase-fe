import ActionTypes from './ActionTypes';

export default class Actions {
  static setCurrentUser(user) {
    return {
      type: ActionTypes.SET_CURRENT_USER,
      user,
    }
  }

  static signIn(user) {
    return {
      type: ActionTypes.SIGN_IN,
      user,
    }
  }

  static signOut() {
    return {
      type: ActionTypes.SIGN_OUT,
    }
  }

  static setDistilleries(distilleries) {
    return {
      type: ActionTypes.SET_DISTILLERIES,
      distilleries,
    }
  }

  static setNearbyDistilleries(distilleryIds) {
    return {
      type: ActionTypes.SET_NEARBY_DISTILLERIES,
      distilleryIds,
    }
  }

  static setVisitedDistilleries(distilleryIds) {
    return {
      type: ActionTypes.SET_VISITED_DISTILLERIES,
      distilleryIds,
    }
  }

  static toggleVisitedDistillery(distilleryId) {
    return {
      type: ActionTypes.TOGGLE_VISITED_DISTILLERY,
      distilleryId,
    }
  }

  static addVisitedDistillery(distilleryId) {
    return {
      type: ActionTypes.ADD_VISITED_DISTILLERY,
      distilleryId,
    }
  }

  static removeVisitedDistillery(distilleryId) {
    return {
      type: ActionTypes.REMOVE_VISITED_DISTILLERY,
      distilleryId,
    }
  }

  static computeDistances() {
    return {
      type: ActionTypes.COMPUTE_DISTANCES,
    }
  }
}
