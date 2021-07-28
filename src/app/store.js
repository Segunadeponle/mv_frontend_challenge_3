import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import playlistReducer from '../features/playlist/playlistSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    playlist: playlistReducer,
  },
});
