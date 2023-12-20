import PostsList from './features/posts/PostsList';
import PostAddForm from './features/posts/PostAddForm';
import Layout from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import SinglePostPage from './features/posts/SinglePostPage';
import PostEditForm from './features/posts/PostEditForm'
import UsersList from './features/users/UsersList';
import UserPage from './features/users/UserPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<PostsList />} />

        <Route path="blog">
          <Route index element={<PostAddForm />}/>
          <Route path=":postId" element={<SinglePostPage />}/>
          <Route path="edit/:postId" element={<PostEditForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
