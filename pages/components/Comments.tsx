import Comment from "./Comment";
const Comments = ({ comments, user }: any) => {
  return (
    <>
      {comments.length > 0
        ? comments.map((comment: any, index: number) => (
            <Comment comment={comment} user={user} key={index} />
          ))
        : ""}
    </>
  );
};

export default Comments;
