import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useUpdatePostMutation,
  useDeletePostMutation,
  selectPostById,
} from "./postsSlice";
import { selectAllUsers } from "../users/userSlice";
import { useParams, useNavigate } from "react-router-dom";

const PostEditForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

  const onChangedTitle = (e) => setTitle(e.target.value);
  const onChangedContent = (e) => setContent(e.target.value);
  const onChangedAuthor = (e) => setUserId(Number(e.target.value));

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const isSave = [title, content, userId].every(Boolean) && !isLoading;

  const handleSubmit = async () => {
    if (isSave) {
      try {
        await updatePost({
          id: post.id,
          title,
          body: content,
          userId,
          reactions: post.reactions,
        });

        setTitle(" ");
        setContent(" ");
        setUserId(" ");
        navigate(`/blog/${postId}`);
      } catch (err) {
        console.error("Failed to update post");
      }
    }
  };

  const delHandleSubmit = async () => {
    try {
      await deletePost({ id: post.id });
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  if (!post) {
    return (
      <section>
        <h2>Post not Found!</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>Add New Post</h2>
      <form>
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
          Edit Post
        </button>
        <button type="delbutton" onClick={delHandleSubmit}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default PostEditForm;
