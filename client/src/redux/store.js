import { configureStore } from '@reduxjs/toolkit'

import getSliceReducer from './slices';

export const store = configureStore({
    reducer: {
        gets: getSliceReducer
    }
});