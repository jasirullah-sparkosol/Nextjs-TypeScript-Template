import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseApi';
import API_ROUTES from 'api/routes';
import { FileType } from 'types/api/file';

export const FileApi = createApi({
    reducerPath: 'FileApi',
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        // post save-file
        postSaveFile: builder.mutation<FileType, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: API_ROUTES.file.post,
                    method: 'POST',
                    headers: {
                        application: 'multipart/form-data'
                    },
                    body: formData
                };
            }
        }),

        // delete delete-file
        deleteDeleteFile: builder.mutation<void, string>({
            query: (name) => ({
                url: API_ROUTES.file.delete.replace(':name', name),
                method: 'POST'
            })
        })
    })
});

export const { usePostSaveFileMutation, useDeleteDeleteFileMutation } = FileApi;
