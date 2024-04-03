import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './slices/apiSlice';
import favoritesReducer from './slices/favoritesSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    favorites: favoritesReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
