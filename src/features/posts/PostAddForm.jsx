import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsSlice";
import { selectAllUsers } from "../users/userSlice";

const PostAddForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const navigate = useNavigate();

  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const onChangedTitle = (e) => setTitle(e.target.value);
  const onChangedContent = (e) => setContent(e.target.value);
  const onChangedAuthor = (e) => setUserId(e.target.value);

  const userOptions = users?.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const isSave = [title, content, userId].every(Boolean) && !isLoading;

  const handleSubmit = async () => {
    if (isSave) {
      try {
        await addNewPost({ title, body: content, userId });
        setTitle(" ");
        setContent(" ");
        setUserId(" ");
        navigate("/");
      } catch (err) {
        console.error("Failed to save post");
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

export default PostAddForm;
