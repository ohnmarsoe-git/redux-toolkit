import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { getAllUsers } from "../users/userSlice";

const PostAddFrom = () => {
  const dispatch = useDispatch();

  const users = useSelector(getAllUsers);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const onChangedTitle = (e) => setTitle(e.target.value);
  const onChangedContent = (e) => setContent(e.target.value);
  const onChangedAuthor = (e) => setUserId(e.target.value);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const handleSubmit = () => {
    if (title && content && userId) {
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
    }
  };

  const isSave = Boolean(title) && Boolean(content) && Boolean(userId);

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
