import { connect } from "react-redux";
import * as commentActions from "../../store/actions/commentActions";
import { bindActionCreators } from "redux";
import MobileVotes from "./MobileVotes";

const CommentProfile = ({
  image,
  username,
  createdAt,
  currentUser,
  content,
  user,
  handleClick,
  comments,
  commentId,
  actions,
  replyIndexMobile,
}: any) => {
  const handleDelete = () => {
    let currComment = comments.find((m: any) => {
      return m.id == commentId;
    });
    actions.deleteComment(currComment);
  };

  return (
    <>
      <div className="comment px-2 w-95">
        <div className="comment-header d-flex">
          <div className="d-flex align-items-center w-50">
            <div>
              <img
                alt="avatar"
                src={image && image.png.substring(1)}
                className="avatar-sm"
              />
            </div>
            <div className="pl-1">
              <p className="font-weight-bold">{username}</p>
            </div>
            <div className="pl-1">
              <p className="color-grayish-blue">{createdAt}</p>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center w-50 hide-mobile">
            {username === currentUser ? (
              <>
                <div
                  className="px-1 d-flex cursor-pointer"
                  onClick={handleDelete}
                >
                  <img src="images/icon-delete.svg" alt="reply" />
                  <p className="m-0 pl-1 color-red font-weight-bold">Delete</p>
                </div>

                <div className="px-1 d-flex cursor-pointer">
                  <img src="images/icon-edit.svg" alt="reply" />
                  <p className="m-0 pl-1 color-moderate-blue font-weight-bold">
                    Edit
                  </p>
                </div>
              </>
            ) : (
              <div
                className="px-1 cursor-pointer d-flex "
                onClick={handleClick}
              >
                <img src="images/icon-reply.svg" alt="reply" />
                <p className="pl-1 m-0 font-weight-bold color-moderate-blue">
                  Reply
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="comment-copy p-4">
          <p className="m-0">{content}</p>
        </div>
        {username === currentUser && (
          <div className="pt-1">
            <div>
              <textarea
                className="w-100"
                rows={5}
                placeholder="Add a comment..."
              >
                {content}
              </textarea>
            </div>
            <div className="d-flex justify-content-end pt-1">
              <button className="moderate-blue-bg color-white px-2 pt-1 pb-1 btn-send">
                UPDATE
              </button>
            </div>
          </div>
        )}

        <div className="d-flex align-items-center my-2 hide-desktop">
          <div className="w-30">
            <MobileVotes id={commentId} replyIndexMobile={replyIndexMobile} />
          </div>

          <div className="w-70 d-flex justify-content-end align-items-center ">
            {username === currentUser ? (
              <>
                <div className="px-1 d-flex" onClick={handleDelete}>
                  <img src="images/icon-delete.svg" alt="reply" />
                  <p className="m-0 pl-1 color-red font-weight-bold">Delete</p>
                </div>

                <div className="px-1 d-flex cursor-pointer">
                  <img src="images/icon-edit.svg" alt="reply" />
                  <p className="m-0 pl-1 color-moderate-blue font-weight-bold">
                    Edit
                  </p>
                </div>
              </>
            ) : (
              <div className="cursor-pointer d-flex " onClick={handleClick}>
                <img src="images/icon-reply.svg" alt="reply" />
                <p className="pl-1 m-0 font-weight-bold color-moderate-blue">
                  Reply
                </p>
              </div>
            )}
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
      deleteComment: bindActionCreators(commentActions.deleteComment, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentProfile);
