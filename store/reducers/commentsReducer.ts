import * as types from "../actions/actionTypes";
import intitialState from "../intitialState";

export default function commentsReducer(
  state = intitialState.comments,
  action: any
) {
  switch (action.type) {
    case types.CREATE_COMMENT_SUCCESS:
      return [...state, { ...action.comment }];
    case types.UPDATE_COMMENT_SUCCESS:
      return state.map((comment) =>
        comment["id"] == action.comment.id ? action.comment : comment
      );
    case types.LOAD_COMMENTS_SUCCESS:
      return action.comments.response;
    case types.DELETE_COMMENT_OPTIMISTIC:
      return state.filter((comment) => comment["id"] !== action.comment.id);
    default:
      return state;
  }
}
