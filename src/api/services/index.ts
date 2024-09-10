import { Middleware } from '@reduxjs/toolkit';

// project imports
import { userApi } from './userApi';

const apiMiddlewares: Middleware[] = [userApi.middleware];

export { userApi, apiMiddlewares };
