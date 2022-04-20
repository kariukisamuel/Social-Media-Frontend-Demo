import * as types from "../actions/actionTypes";
import intitialState from "../intitialState";

export default function userReducer(state = intitialState.user, action: any) {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
      return action.user.response.currentUser;
    default:
      return state;
  }
}
