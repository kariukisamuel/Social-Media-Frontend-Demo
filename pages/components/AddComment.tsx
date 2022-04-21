import { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as commentActions from "../../store/actions/commentActions";

const AddComment = ({
  user,
  actions,
  commentId,
  commentUser,
  comments,
}: any) => {
  let currComment = comments.find((m: any) => {
    return m.id == commentId;
  });

  const [content, setContent] = useState({
    text: "",
  });
  const [comment, setComment] = useState({});
  const [reply, setReply] = useState({
    id: 0,
    content: "",
    createdAt: 0,
    score: 0,
    user: {},
    replyingTo: "",
  });

  const getLastReplyId = (c: any) => {
    if (c.length > 0) {
      let lastId = c[c.length - 1].id;
      return lastId;
    } else {
      return 0;
    }
  };

  const handleChange = (event: any) => {
    setContent({
      text: event.target.value,
    });
  };
  const handleReplySave = () => {
    let text = content.text;

    let lId = getLastReplyId(currComment.replies);
    setReply({
      ...reply,
      content: text,
      user: user,
      replyingTo: commentUser,
      id: lId,
      createdAt: Date.now(),
    });

    let r = [];
    r[lId] = reply;
    let c = {
      id: currComment.id,
      content: currComment.content,
      createdAt: currComment.createdAt,
      score: currComment.score,
      user: currComment.user,
      replies: r,
    };

    actions.saveComment(c);
  };

  const handleCommentSave = () => {
    let c = {
      id: null,
      content: content.text,
      createdAt: null,
      score: 0,
      user: user,
      replies: [],
    };

    actions.saveComment(c);
  };

  return (
    <>
      <div className="comment-input-container d-flex white-bg m-auto mt-2 hide-mobile">
        <div className="w-5">
          {user.image && (
            <img
              src={user.image.png.substring(1)}
              alt="avatar"
              className="avatar-md"
            />
          )}
        </div>
        <div className="w-85 px-2">
          <textarea
            className="w-100"
            rows={5}
            placeholder="Add a comment..."
            onChange={handleChange}
            value={content.text}
          ></textarea>
        </div>
        <div className="d-flex">
          <div>
            {commentId === undefined ? (
              <button
                className="moderate-blue-bg color-white px-2 pt-1 pb-1 btn-send"
                onClick={handleCommentSave}
              >
                SEND
              </button>
            ) : (
              <button
                className="moderate-blue-bg color-white px-2 pt-1 pb-1 btn-send"
                onClick={handleReplySave}
              >
                SEND
              </button>
            )}
          </div>
        </div>

        <div className="w-10">
          {commentId === undefined ? (
            <button
              className="moderate-blue-bg color-white px-2 pt-1 pb-1 btn-send"
              onClick={handleCommentSave}
            >
              SEND
            </button>
          ) : (
            <button
              className="moderate-blue-bg color-white px-2 pt-1 pb-1 btn-send"
              onClick={handleReplySave}
            >
              SEND
            </button>
          )}
        </div>
      </div>

      <div className="hide-desktop">
        <div className="comment-input-container align-items-center justify-content-between white-bg m-auto mt-2 ">
          <div>
            <textarea
              className="w-100"
              rows={5}
              placeholder="Add a comment..."
              onChange={handleChange}
              value={content.text}
            ></textarea>
          </div>
          <div className="d-flex align-items-center justify-content-between pt-2">
            <>
              {user.image && (
                <img
                  src={user.image.png.substring(1)}
                  alt="avatar"
                  className="avatar-md"
                />
              )}
            </>

            <>
              {commentId === undefined ? (
                <button
                  className="moderate-blue-bg color-white px-2 pt-1 pb-1 btn-send"
                  onClick={handleCommentSave}
                >
                  SEND
                </button>
              ) : (
                <button
                  className="moderate-blue-bg color-white px-2 pt-1 pb-1 btn-send"
                  onClick={handleReplySave}
                >
                  SEND
                </button>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps({ comments }: any) {
  return { comments };
}
function mapDispatchToProps(dispatch: any) {
  return {
    actions: {
      saveComment: bindActionCreators(commentActions.saveComment, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
