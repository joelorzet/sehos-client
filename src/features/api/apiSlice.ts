import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store';
import { URL } from '@/routes/routes';

const baseQuery = fetchBaseQuery({
  baseUrl: URL.baseURL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Product', 'Address', 'Updates', 'Reviews', 'Orders', 'Favourites'],
  endpoints: () => ({}),
});
