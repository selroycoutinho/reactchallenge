import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { mockApi } from './mockServer'
import type { User, Post } from './mockServer'

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),

  tagTypes: ['User', 'Post'],

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          const data = await mockApi.getUsers()
          return { data }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch users',
            },
          }
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'User' as const,
                id,
              })),
              { type: 'User' as const, id: 'LIST' },
            ]
          : [{ type: 'User' as const, id: 'LIST' }],
    }),

    createUser: builder.mutation<
      User,
      Omit<User, 'id'>
    >({
      queryFn: async (user) => {
        try {
          const data = await mockApi.createUser(user)
          return { data }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to create user',
            },
          }
        }
      },

      invalidatesTags: [
        { type: 'User', id: 'LIST' },
      ],
    }),

    getPosts: builder.query<Post[], void>({
      queryFn: async () => {
        try {
          const data = await mockApi.getPosts()
          return { data }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch posts',
            },
          }
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Post' as const,
                id,
              })),
              { type: 'Post' as const, id: 'LIST' },
            ]
          : [{ type: 'Post' as const, id: 'LIST' }],
    }),

    addPost: builder.mutation<
      Post,
      Omit<Post, 'id'>
    >({
      queryFn: async (post) => {
        try {
          const data = await mockApi.createPost(post)
          return { data }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to create post',
            },
          }
        }
      },

      invalidatesTags: [
        { type: 'Post', id: 'LIST' },
      ],

      async onQueryStarted(
        arg,
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            'getPosts',
            undefined,
            (draft) => {
              draft.push({
                ...arg,
                id: Date.now(),
              })
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),

    getPostById: builder.query<Post, number>({
      queryFn: async (id) => {
        try {
          const data = await mockApi.getPostById(id)
          return { data }
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch post',
            },
          }
        }
      },

      providesTags: (_result, _error, id) => [
        { type: 'Post', id },
      ],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostByIdQuery,
} = apiSlice