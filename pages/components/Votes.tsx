import { useState } from "react";
import { connect } from "react-redux";
import * as commentActions from "../../store/actions/commentActions";
import { bindActionCreators } from "redux";

const Votes = ({ id, actions, comments }: any) => {
  let currComment = comments.find((m: any) => {
    return m.id == id;
  });

  const [comment, setComment] = useState({ ...currComment });

  const upVote = () => {
    let newComment = { ...comment, score: comment.score++ };
    actions.saveComment(newComment);
  };

  const downVote = () => {
    let newComment = { ...comment, score: comment.score-- };
    actions.saveComment(newComment);
  };

  return (
    <div className="w-5 hide-mobile">
      <div className="desktop-voting verylightgray-bg">
        <div className="d-flex justify-content-center">
          <img src="images/icon-plus.svg" alt="upvote" onClick={upVote} />
        </div>
        <div className="d-flex justify-content-center votes color-moderate-blue">
          <p className="font-weight-bold">{comment.score}</p>
        </div>
        <div className="d-flex justify-content-center">
          <img src="images/icon-minus.svg" alt="downvote" onClick={downVote} />
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Votes);
