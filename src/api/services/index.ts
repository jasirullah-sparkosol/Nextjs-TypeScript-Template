import { Middleware, Reducer } from '@reduxjs/toolkit';

// project imports
import { FileApi } from './fileApi';
import { GiftApi } from './giftApi';

export const apiMiddlewares: Middleware[] = [
    FileApi.middleware,
    GiftApi.middleware
];

export const apiReducers: Record<string, Reducer> = {
    [FileApi.reducerPath]: FileApi.reducer,
    [GiftApi.reducerPath]: GiftApi.reducer
};
