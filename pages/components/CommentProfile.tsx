import { connect } from "react-redux";
import * as commentActions from "../../store/actions/commentActions";
import { bindActionCreators } from "redux";
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
            {username === currentUser && (
              <>
                <div className="px-1 d-flex" onClick={handleDelete}>
                  <img src="images/icon-delete.svg" alt="reply" />
                  <p className="m-0 pl-1 color-red">Delete</p>
                </div>

                <div className="px-1 d-flex">
                  <img src="images/icon-edit.svg" alt="reply" />
                  <p className="m-0 pl-1 color-moderate-blue">Edit</p>
                </div>
              </>
            )}

            <img
              src="images/icon-reply.svg"
              alt="reply"
              onClick={handleClick}
            />
            <p
              className="pl-1 font-weight-bold color-moderate-blue"
              onClick={handleClick}
            >
              Reply
            </p>
          </div>
        </div>

        <div className="comment-copy p-4">
          <p className="m-0">{content}</p>
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
