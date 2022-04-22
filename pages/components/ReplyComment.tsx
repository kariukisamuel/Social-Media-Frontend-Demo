import AddComment from "./AddComment";
import CommentProfile from "./CommentProfile";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import * as commentActions from "../../store/actions/commentActions";

const ReplyComment = ({ commentId, replies, user, comments, actions }: any) => {
  let currComment = comments.find((m: any) => {
    return m.id == commentId;
  });
  useEffect(() => {}, [comments]);
  useEffect(() => {}, [replies]);

  const [comment, setComment] = useState({ ...currComment });

  const [openReply, setOpenReply] = useState(false);
  const handleClick = () => {
    setOpenReply(!openReply);
  };

  const upVote = (index: number) => {
    console.log(index);
    let reply = {
      ...comment.replies[index],
      score: comment.replies[index].score++,
    };

    let a = comment.replies;
    Object.assign([], a, {
      [index]: reply,
    });

    setComment({ ...comment, replies: a });
    actions.saveComment(comment);
  };

  const downVote = (index: number) => {
    let reply = {
      ...comment.replies[index],
      score: comment.replies[index].score--,
    };
    let a = comment.replies;
    Object.assign([], a, {
      [index]: reply,
    });

    setComment({ ...comment, replies: a });
    actions.saveComment(comment);
  };

  return (
    <>
      <div className="reply">
        <div className="replies-divider ml-5 pl-5">
          {replies.map((reply: any, index: number) => (
            <>
              <div
                className="comment-container p-4 mt-2 white-bg m-auto"
                key={index}
              >
                <div className="d-flex">
                  <div className="w-5 hide-mobile">
                    <div className="desktop-voting verylightgray-bg">
                      <div
                        className="d-flex justify-content-center cursor-pointer"
                        onClick={() => upVote(index)}
                      >
                        <img src="images/icon-plus.svg" alt="upvote" />
                      </div>
                      <div className="d-flex justify-content-center votes color-moderate-blue">
                        <p className="font-weight-bold">
                          {comment.replies[index].score}
                        </p>
                      </div>
                      <div
                        className="d-flex justify-content-center cursor-pointer"
                        onClick={() => downVote(index)}
                      >
                        <img src="images/icon-minus.svg" alt="downvote" />
                      </div>
                    </div>
                  </div>
                  <CommentProfile
                    image={reply.user.image}
                    username={reply.user.username}
                    createdAt={reply.createdAt}
                    currentUser={user.username}
                    content={reply.content}
                    handleClick={handleClick}
                    replyIndexMobile={index}
                    commentId={commentId}
                  />
                </div>
              </div>
              {user && openReply && (
                <AddComment
                  user={user}
                  commentId={comment.id}
                  commentUser={comment.user.username}
                />
              )}
            </>
          ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReplyComment);
