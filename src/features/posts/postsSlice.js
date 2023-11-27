import {createSlice, nanoid} from '@reduxjs/toolkit'
import { sub } from 'date-fns';

// manual
/* const initialState = [{
  id: '1',
  title: 'Learning Redux Toolkit',
  content: "I've heard good things.",
  date: sub(new Date(), {minutes: 10}).toISOString(),
  reactions: {
    like: 0,
    wow: 0,
    heart: 0
  }
},
{
  id: '2',
  title: 'Slices...',
  content: "The more I say slice, the more I want pizza.",
  date: sub(new Date(), {minutes: 10}).toISOString(),
  reactions: {
    like: 0,
    wow: 0,
    heart: 0
  }
}]*/

const initialState = {
  posts: [],
  status: 'idle', //idle | loading | success | failed
  error: null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer (state, action) {
        console.log(action.payload);
        state.push(action.payload)
      },
      prepare (title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: sub(new Date(), {minutes: 10}).toISOString(),
            reactions: {
              like: 0,
              wow: 0,
              heart: 0
            }
          }
        }
      }
    },
    reactionAdded(state, action) {
      const {postId, reaction} = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if(existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  }
})

export const getAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded  } = postsSlice.actions;

export default postsSlice.reducer;