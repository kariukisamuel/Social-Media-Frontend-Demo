import { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as commentActions from "../../store/actions/commentActions";

const AddComment = ({ user, actions }: any) => {
  const [values, setValues] = useState({
    content: "",
    createdAt: "",
    score: 0,
    user: {},
    replies: [],
  });

  const handleChange = (event: any) => {
    setValues({ ...values, content: event.target.value, user: user });
  };
  const handleSave = () => {
    actions.saveComment(values);
  };

  return (
    <div className="comment-input-container d-flex white-bg m-auto mt-2">
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
          value={values.content}
        ></textarea>
      </div>
      <div className="w-10">
        <button
          className="moderate-blue-bg color-white px-2 pt-1 pb-1 btn-send"
          onClick={handleSave}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    actions: {
      saveComment: bindActionCreators(commentActions.saveComment, dispatch),
    },
  };
}
export default connect(null, mapDispatchToProps)(AddComment);
