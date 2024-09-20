// project import
import reducers from './reducers';

// third-party
import React from 'react';
import dynamic from 'next/dynamic';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// @ts-ignore
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiMiddlewares } from '../api/services';
import { Persistor } from 'redux-persist/es/types';

// ==============================|| REDUX PERSIST For Next.js SSR ||============================== //
const PersistGateNoSSR = dynamic(
    () => import('redux-persist/integration/react').then((mod) => mod.PersistGate),
    { ssr: false }
);

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: string) {
            return Promise.resolve();
        }
    };
};

// This is because storage can't be created on the server-side
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const APP_NAME = process.env.NEXT_APP_NAME as string;

const persistConfig = {
    keyPrefix: APP_NAME.replaceAll(' ', '-').toLowerCase() + '-',
    key: 'store',
    storage,
    transforms: [
        // For Store Encryption in LocalStorage
        encryptTransform({
            secretKey: 'Developed-By-Jasir-Ullah-Khan',
            onError: function(error: any) {
                console.log('Error during encryption', error);
            }
        })
    ]
    // whitelist : ["amount"],
    // blacklist : ["users"],
};

// Persist All reducers
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(...apiMiddlewares);
    }
});

// Setup React Query listeners for re-fetching on app focus or network change etc
setupListeners(store.dispatch);

// @ts-ignore
const persistor = persistStore(store) as Persistor;

const { dispatch } = store;

interface ReduxPersistedProps {
    children: React.ReactNode;
}

const ReduxPersisted = ({ children }: ReduxPersistedProps) => {
    return (
        <Provider store={store}>
            <PersistGateNoSSR loading={null} persistor={persistor}>
                {children}
            </PersistGateNoSSR>
        </Provider>
    );
};

export { store, dispatch, ReduxPersisted };
