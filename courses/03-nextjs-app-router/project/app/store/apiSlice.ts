import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

export type Post = {
  id: number
  title: string
  body: string
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'api/posts',
    }),
  }),
})

export const { useGetPostsQuery } = apiSlice