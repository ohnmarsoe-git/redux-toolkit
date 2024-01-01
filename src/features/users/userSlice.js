import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { postsApiSlice } from '../api/PostsApiSlice';

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = postsApiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
        query: () => '/users',
        transformResponse: responseData => {
            return usersAdapter.setAll(initialState, responseData)
        },
        providesTags: (result, error, arg) => [
            { type: 'User', id: "LIST" },
            ...result.ids.map(id => ({ type: 'User', id }))
        ]
    })
  })
})

export const {
  useGetUsersQuery
} = usersApiSlice

export const selectUserResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUserResult,
  usersResult => usersResult.data
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
  // Pass in a selector that returns the posts slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)