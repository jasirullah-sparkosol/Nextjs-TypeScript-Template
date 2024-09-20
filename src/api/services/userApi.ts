import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "./baseApi";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    getUser: builder.query<Snackbar, void>({
      query: () => "user",
    }),
  }),
});

export const { useGetUserQuery } = userApi;
