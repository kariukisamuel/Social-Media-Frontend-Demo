import * as types from "./actionTypes";
import { Dispatch } from "redux";
import loadUser from "../../lib/load-user";

export function loadUserSuccess(user: User) {
  return { type: types.LOAD_USER_SUCCESS, user };
}

export function getUser() {
  return function (dispatch: Dispatch) {
    return loadUser()
      .then((user) => {
        dispatch(loadUserSuccess(user));
      })
      .catch((error) => {
        throw error;
      });
  };
}
