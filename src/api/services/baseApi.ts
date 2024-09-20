import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

// next
import { getSession, signOut } from 'next-auth/react';
import { SIGN_IN_PATH } from 'config';

const BASE_URL = process.env.NEXT_APP_API_URL as string;
console.log('RTK BaseURL:', BASE_URL);

// BaseQuery without auth headers
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL
});

// BaseQuery with auth headers
const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
        const session = await getSession();
        if (session?.token.accessToken) {
            headers.set('Authorization', `Bearer ${session?.token.accessToken}`);
        }
        return headers;
    }
});

// BaseQuery with auth headers and re-auth if 401
const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQueryWithAuth(args, api, extraOptions);
    if (result.error && result.error.status === 401 && !window.location.href.includes('/sign-in')) {
        // Redirect to sign-in
        await signOut({ redirect: false });
        window.location.pathname = SIGN_IN_PATH;
    }
    return result;
};

export { BASE_URL, baseQuery, baseQueryWithAuth, baseQueryWithReAuth };
