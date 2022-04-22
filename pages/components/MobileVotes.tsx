import { useState } from "react";
import { connect } from "react-redux";
import * as commentActions from "../../store/actions/commentActions";
import { bindActionCreators } from "redux";

const MobileVotes = ({ id, actions, comments, replyIndexMobile }: any) => {
  let currComment = comments.find((m: any) => {
    return m.id == id;
  });

  const [comment, setComment] = useState({ ...currComment });

  const upVote = () => {
    if (replyIndexMobile !== undefined) {
      let reply = {
        ...comment.replies[replyIndexMobile],
        score: comment.replies[replyIndexMobile].score++,
      };

      let a = comment.replies;
      Object.assign([], a, {
        [replyIndexMobile]: reply,
      });

      setComment({ ...comment, replies: a });
      actions.saveComment(comment);
    } else {
      let newComment = { ...comment, score: comment.score++ };
      actions.saveComment(newComment);
    }
  };

  const downVote = () => {
    if (replyIndexMobile !== undefined) {
      let reply = {
        ...comment.replies[replyIndexMobile],
        score: comment.replies[replyIndexMobile].score--,
      };
      let a = comment.replies;
      Object.assign([], a, {
        [replyIndexMobile]: reply,
      });

      setComment({ ...comment, replies: a });
      actions.saveComment(comment);
    } else {
      let newComment = { ...comment, score: comment.score-- };
      actions.saveComment(newComment);
    }
  };

  return (
    <div className="verylightgray-bg d-flex justify-content-between p-1 mobile-voting ">
      <div className="d-flex align-items-center cursor-pointer">
        <img src="images/icon-plus.svg" alt="upvote" onClick={upVote} />
      </div>
      <div className="color-moderate-blue d-flex align-items-center">
        <p className="font-weight-bold m-0">
          {replyIndexMobile !== undefined
            ? comment.replies[replyIndexMobile].score
            : comment.score}
        </p>
      </div>
      <div className="d-flex align-items-center cursor-pointer">
        <img src="images/icon-minus.svg" alt="downvote" onClick={downVote} />
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
export default connect(mapStateToProps, mapDispatchToProps)(MobileVotes);
