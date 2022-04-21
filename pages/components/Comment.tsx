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
        {comment.user && (
          <CommentProfile
            image={comment.user.image}
            username={comment.user.username}
            createdAt={comment.createdAt}
            currentUser={user.username}
            content={comment.content}
            user={user}
            handleClick={handleClick}
            commentId={comment.id}
          />
        )}
      </div>
      <div className="reply w-100">
        <div className="replies-divider ml-5 pl-5">
          {user && openReply && (
            <AddComment
              user={user}
              commentId={comment.id}
              commentUser={comment.user.username}
            />
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <ReplyComment
          replies={comment.replies}
          commentId={comment.id}
          user={user}
        />
      )}
    </>
  );
};

export default Comment;
