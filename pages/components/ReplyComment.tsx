import Comment from "./Comment";
import Votes from "./Votes";
import CommentProfile from "./CommentProfile";
import { connect } from "react-redux";
import { useState } from "react";
import { bindActionCreators } from "redux";
import * as commentActions from "../../store/actions/commentActions";

const ReplyComment = ({ commentId, replies, user, comments, actions }: any) => {
  let currComment = comments.find((m: any) => {
    return m.id == commentId;
  });

  const [comment, setComment] = useState({ ...currComment });
  const [replyObj, setReply] = useState([...currComment.replies]);

  const upVote = (index: number) => {
    let reply = {
      ...comment.replies[index],
      score: comment.replies[index].score++,
    };
    setReply({ ...replyObj, [index]: reply });
    setComment({ ...comment, replies: replyObj });
    actions.saveComment(comment);
  };

  const downVote = (index: number) => {
    let reply = {
      ...comment.replies[index],
      score: comment.replies[index].score++,
    };
    setReply({ ...replyObj, [index]: reply });
    setComment({ ...comment, replies: replyObj });
    actions.saveComment(comment);
  };

  return (
    <div className="reply w-100">
      <div className="replies-divider ml-5 pl-5">
        {replies.map((reply: any, index: number) => (
          <div
            className="comment-container p-4 mt-2 white-bg m-auto"
            key={index}
          >
            <div className="d-flex">
              <div className="w-5">
                <div className="desktop-voting verylightgray-bg">
                  <div className="d-flex justify-content-center">
                    <img
                      src="images/icon-plus.svg"
                      alt="upvote"
                      onClick={() => upVote(index)}
                    />
                  </div>
                  <div className="d-flex justify-content-center votes color-moderate-blue">
                    <p className="font-weight-bold">
                      {comment.replies[index].score}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center">
                    <img
                      src="images/icon-minus.svg"
                      alt="downvote"
                      onClick={() => downVote(index)}
                    />
                  </div>
                </div>
              </div>
              <CommentProfile
                image={reply.user.image}
                username={reply.user.username}
                createdAt={reply.createdAt}
                currentUser={user.username}
                content={reply.content}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
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
