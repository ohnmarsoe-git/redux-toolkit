import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { getAllUsers } from "../users/userSlice";

const PostAddFrom = () => {
  const dispatch = useDispatch();

  const users = useSelector(getAllUsers);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onChangedTitle = (e) => setTitle(e.target.value);
  const onChangedContent = (e) => setContent(e.target.value);
  const onChangedAuthor = (e) => setUserId(e.target.value);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const isSave =
    Boolean(title) &&
    Boolean(content) &&
    Boolean(userId) &&
    addRequestStatus === "idle";

  const handleSubmit = () => {
    if (isSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwarp();
        setTitle(" ");
        setContent(" ");
        setUserId(" ");
      } catch (err) {
        console.error("Failed to save post");
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <section>
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle"> Post Title: </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onChangedTitle}
        />
        <label htmlFor="Author"> Author: </label>
        <select value={userId} onChange={onChangedAuthor}>
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent"> Post Content: </label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onChangedContent}
        />
        <button type="button" disabled={!isSave} onClick={handleSubmit}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default PostAddFrom;
