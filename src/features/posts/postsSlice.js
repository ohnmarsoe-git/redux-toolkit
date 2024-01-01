import { createSelector, createEntityAdapter} from '@reduxjs/toolkit'
import { sub } from 'date-fns';
import { postsApiSlice } from '../api/PostsApiSlice';

const postsAdapter = createEntityAdapter({
  sortComparer: (a,b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = postsApiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
      transformResponse: responseData => {
        let min = 1;
        const loadedPosts = responseData.map(post => {
          if(!post?.date) post.date = sub(new Date(), {minutes: min++,}).toISOString();
          if(!post?.reactions) post.reactions = {
            like: 0,
            wow: 0,
            heart: 0,
          }
          return post;
        })
        return postsAdapter.setAll(initialState, loadedPosts)
      },
      providesTags: (result, error, arg) => [
        { type: 'Post', id: "LIST" },
        ...result.ids.map(id => ({ type: 'Post', id }))
    ]
    }),
    getPostsByUserId: builder.query({
      query: id => `/posts/?userId=${id}`,
      transformResponse: responseData => {
          let min = 1;
          const loadedPosts = responseData.map(post => {
              if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
              if (!post?.reactions) post.reactions = {
                  like: 0,
                  wow: 0,
                  heart: 0,
              }
              return post;
          });
          return postsAdapter.setAll(initialState, loadedPosts)
      },
      providesTags: (result, error, arg) => [
          ...result.ids.map(id => ({ type: 'Post', id }))
      ]
    }),
    addNewPost: builder.mutation({
      query: initialPost => ({
        url: '/posts',
        method: 'POST',
        body: {
          ...initialPost,
          userId: Number(initialPost.userId),
          date: new Date().toISOString(),
          reactions: {
            like: 0,
            wow: 0,
            heart: 0
          }
        }
      }),
      invalidatesTags: [
        {type: 'Post', id: "LIST"}
      ]
    }),
    updatePost: builder.mutation({
      query: initialPost => ({
        url: `/posts/${initialPost.id}`,
        method: 'PUT',
        body: {
          ...initialPost,
          date: new Date().toISOString()
        }
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Post', id: arg.id}
      ]
    }),
    deletePost: builder.mutation({
      query: ({id}) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
        body: {id}
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Post', id: arg.id}
      ]
    }),
    addReaction: builder.mutation({
      query: ({ postId, reactions }) => ({
        url: `posts/${postId}`,
        method: 'PATCH',
        body: { reactions }
      }),
      async onQueryStarted({postId, reactions}, { dispatch, queryFulFilled }) {
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
            const post = draft.entities[postId]
            if(post) post.reactions = reactions
          })
        )
        try {
          await queryFulFilled
        } catch {
          patchResult.undo()
        }
      }
    })  
  })
})

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation
} = extendedApiSlice

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

// Creates memoized selector
const selectPostsData = createSelector (
  selectPostsResult,
  postsResult => postsResult.data // normalized state object with ids & entities
)

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)