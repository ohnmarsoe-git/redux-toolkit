import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5050',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.token
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    if (token) {
      headers.set("authorization", `Bearer ${token}` )
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if(result?.error?.status === 403) {

    const refreshResult = await baseQuery('/refresh', api, extraOptions)

    if(refreshResult?.data) {
      const user = api.getState().auth.user

      api.dispatch(setCredentials({...refreshResult.data, user}))

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})