import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import { usersApiSlice } from './features/users/userSlice';
import { extendedApiSlice } from './features/posts/postsSlice';

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


