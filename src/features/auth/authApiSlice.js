import { apiSlice } from '../../app/api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
      login: builder.mutation({
          query: credentials => ({
              url: '/auth',
              method: 'POST',
              body: { ...credentials }
          })
      }),
      singout: builder.query({
        query: () => ({
            url: '/logout',
            method: 'GET'
        })
      }),
  })
})


export const {
  useLoginMutation,
  useSingoutQuery
} = authApiSlice