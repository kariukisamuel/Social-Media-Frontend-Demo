import * as types from "./actionTypes";
import { Dispatch } from "redux";
import loadComments from "../../lib/load-comments";
import saveComments from "../../lib/save-comments";

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

export function saveComment(comment: Comments) {
  return function (dispatch: Dispatch) {
    return saveComments(comment)
      .then((savedComment) => {
        comment.id
          ? dispatch(updateCommentSuccess(savedComment))
          : dispatch(createCommentSuccess(savedComment));
      })
      .catch((error) => {
        throw error;
      });
  };
}

// export function deleteCourse(course) {
//   return function (dispatch) {
//     dispatch(deleteCourseOptimistic(course));
//     return courseApi.deleteCourse(course.id);
//   };
// }
