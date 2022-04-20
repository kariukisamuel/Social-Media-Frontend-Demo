import Votes from "./Votes";
import CommentProfile from "./CommentProfile";
import ReplyComment from "./ReplyComment";
import AddComment from "./AddComment";

import { useState } from "react";

const Comment = ({ comment, user }: any) => {
  const [openReply, setOpenReply] = useState(false);
  const handleClick = () => {
    setOpenReply(!openReply);
  };
  return (
    <>
      <div className="comment-container p-4 p-4 mt-2 white-bg d-flex m-auto">
        <Votes id={comment.id} />
        {comment && (
          <CommentProfile
            image={comment.user.image}
            username={comment.user.username}
            createdAt={comment.createdAt}
            currentUser={user.username}
            content={comment.content}
            user={user}
            handleClick={handleClick}
          />
        )}
      </div>
      {user && openReply && <AddComment user={user} />}
      {comment.replies.length > 0 && (
        <ReplyComment
          replies={comment.replies}
          commentId={comment.id}
          replyId={comment.replies.id}
          score={comment.replies.score}
          user={user}
        />
      )}
    </>
  );
};

export default Comment;
