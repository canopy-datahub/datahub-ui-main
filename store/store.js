/* Core */
// from example https://github.com/vercel/next.js/blob/canary/examples/with-redux/lib/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import { useMemo } from 'react';

/* Instruments */
let store;

/**
 *
 * @param {Object} preloadedState - State that is coming in from the server cache
 * @returns the configured redux store with a SSR preloaded State
 */
export const createStore = (preloadedState) => {
    const store = configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware(); // TODO add this if you make logger .concat(middleware);
        },
        preloadedState,
        devTools: process.env.NODE_ENV !== 'production',
    });
    return store;
};

export const initializeStore = (preloadedState) => {
    let _store = store ?? createStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = createStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') {
        return _store;
    }
    // Create the store once in the client
    if (!store) {
        store = _store;
    }
    return _store;
};

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}
