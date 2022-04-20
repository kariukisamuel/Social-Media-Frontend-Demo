const saveComments = async (comment: Comments) => {
  const res = await fetch("http://localhost:3000/api/comments/create", {
    method: comment.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  const data = await res.json();
  return data;
};
export default saveComments;
