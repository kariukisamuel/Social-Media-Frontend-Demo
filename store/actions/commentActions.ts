import * as types from "./actionTypes";
import { Dispatch } from "redux";
import loadComments from "../../lib/load-comments";
import saveComments from "../../lib/save-comments";
import deleteComments from "../../lib/delete-comments";

export function loadCommentsSuccess(comments: Comment) {
  return { type: types.LOAD_COMMENTS_SUCCESS, comments };
}
export function createCommentSuccess(comment: Comment) {
  return { type: types.CREATE_COMMENT_SUCCESS, comment: comment };
}
export function updateCommentSuccess(comment: Comment) {
  return { type: types.UPDATE_COMMENT_SUCCESS, comment: comment };
}
export function deleteCommentOptimistic(comment: Comment) {
  return { type: types.DELETE_COMMENT_OPTIMISTIC, comment: comment };
}

export function getComments() {
  return function (dispatch: Dispatch) {
    return loadComments()
      .then((comments) => {
        dispatch(loadCommentsSuccess(comments));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveComment(comment: any) {
  return function (dispatch: Dispatch) {
    return saveComments(comment)
      .then((savedComment) => {
        comment.id
          ? dispatch(updateCommentSuccess(savedComment.response))
          : dispatch(createCommentSuccess(savedComment.response));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteComment(comment: any) {
  return function (dispatch: Dispatch) {
    dispatch(deleteCommentOptimistic(comment));
    return deleteComments(comment.id);
  };
}
