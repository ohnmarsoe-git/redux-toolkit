import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postsApiSlice = createApi({
  reducerPath: 'postsapi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
  tagTypes: ['Post', 'User'],
  endpoints: budider => ({})
})