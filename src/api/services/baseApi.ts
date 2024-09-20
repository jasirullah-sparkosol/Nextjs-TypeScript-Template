import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

// next
import { getSession } from "next-auth/react";

const baseUrl = process.env.NEXT_APP_API_URL as string;

// BaseQuery without auth headers
const baseQuery = fetchBaseQuery({
  baseUrl: "/",
});

// BaseQuery with auth headers
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "/",
  prepareHeaders: async (headers, { getState }) => {
    const session = await getSession();
    if (session?.token.accessToken) {
      headers.set("Authorization", `Bearer ${session?.token.accessToken}`);
    }
    return headers;
  },
});

// BaseQuery with auth headers and re-auth if 401
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);
  if (
    result.error &&
    result.error.status === 401 &&
    !window.location.href.includes("/login")
  ) {
    // Redirect to login
    window.location.pathname = "/login";
  }
  return result;
};

export { baseUrl, baseQuery, baseQueryWithAuth, baseQueryWithReAuth };
