import PostsList from './features/posts/PostsList';
import PostAddFrom from './features/posts/PostAddFrom';

function App() {
  return (
    <main className="App">
      <PostAddFrom />
      <PostsList />
    </main>
  );
}

export default App;
