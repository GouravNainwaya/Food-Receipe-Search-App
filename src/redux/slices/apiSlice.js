import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'https://api.edamam.com/api/recipes/v2';
const APP_ID = 'c2fdc9a7';
const APP_KEY = '2df1c18660ca94c7d500f460aac300a5';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: builder => ({
    getRecipes: builder.query({
      query: ({ query }) => ({
        url: '',
        params: {
          app_id: APP_ID,
          app_key: APP_KEY,
          type: 'public',
          q: query,
        },
      }),
    }),
  }),
});

export const { useGetRecipesQuery } = api;
