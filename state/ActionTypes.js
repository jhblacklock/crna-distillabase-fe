export default defineActionConstants([
  'SET_CURRENT_USER',
  'SIGN_IN',
  'SIGN_OUT',
  'SET_DISTILLERIES',
  'COMPUTE_DISTANCES',
  'SET_NEARBY_DISTILLERIES',
  'SET_VISITED_DISTILLERIES',
  'ADD_VISITED_DISTILLERY',
  'REMOVE_VISITED_DISTILLERY',
  'TOGGLE_VISITED_DISTILLERY',
]);

function defineActionConstants(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
