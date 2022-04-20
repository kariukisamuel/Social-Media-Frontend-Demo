import type { NextPage } from "next";
import Comments from "./components/Comments";
import AddComment from "./components/AddComment";
import { connect } from "react-redux";
import * as commentActions from "../store/actions/commentActions";
import * as userActions from "../store/actions/userActions";
import { bindActionCreators } from "redux";
import { useEffect } from "react";

const Home: NextPage = ({ actions, comments, user }: any) => {
  console.log(comments);
  useEffect(() => {
    actions.loadUser();
    actions.loadComments();
  }, []);

  return (
    <div className="container m-auto">
      <Comments user={user} comments={comments} />
      <AddComment user={user} />
    </div>
  );
};

function mapStateToProps({ comments, user }: any) {
  return { comments, user };
}
function mapDispatchToProps(dispatch: any) {
  return {
    actions: {
      loadComments: bindActionCreators(commentActions.getComments, dispatch),
      loadUser: bindActionCreators(userActions.getUser, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
