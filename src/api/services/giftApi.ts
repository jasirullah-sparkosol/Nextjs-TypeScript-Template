import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseApi';
import API_ROUTES from '../routes';
import { Gift } from 'types/api/gift';

export const GiftApi = createApi({
    reducerPath: 'GiftApi',
    baseQuery: baseQueryWithReAuth,
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        // Create gift
        postGift: builder.mutation<Gift, Partial<Gift>>({
            query: (body) => ({
                url: API_ROUTES.gift.post,
                method: 'POST',
                body
            })
        }),

        // Get all gifts
        getGifts: builder.query<Gift[], any>({
            query: () => API_ROUTES.gift.list
        }),

        // Get gift by Id
        getGift: builder.query<Gift, string>({
            query: (_id) => API_ROUTES.gift.get.replace(':id', _id)
        }),

        // Update gift by Id
        updateGift: builder.mutation<Gift, Partial<Gift>>({
            query: ({ _id, ...patch }) => ({
                url: API_ROUTES.gift.update.replace(':id', _id as string),
                method: 'PATCH',
                body: patch
            })
        }),

        // Delete gift by Id
        deleteGift: builder.mutation<Gift, string>({
            query: (_id) => ({
                url: API_ROUTES.gift.delete.replace(':id', _id),
                method: 'DELETE'
            })
        })
    })
});

export const {
    usePostGiftMutation,
    useGetGiftsQuery,
    useLazyGetGiftQuery,
    useGetGiftQuery,
    useUpdateGiftMutation,
    useDeleteGiftMutation
} =
    GiftApi;
