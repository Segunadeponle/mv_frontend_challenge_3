import { configureStore, compose } from '@reduxjs/toolkit';
import persistState from 'redux-localstorage'

import playlistReducer from '../features/playlist/playlistSlice';
const localStorageEnhancer = compose(
  persistState(),
);
export const store = configureStore({
  reducer: {
    playlist: playlistReducer,
  },
  enhancers: [localStorageEnhancer]
});
