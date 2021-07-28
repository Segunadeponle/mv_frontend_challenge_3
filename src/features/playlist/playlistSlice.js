import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { nanoid } from 'nanoid';
import { addVideo } from './playlistAPI';

const initialState = {
  data: [
    {
      "id": nanoid(),
      "videoId": "0rkTgPt3M4k",
      "title": "A COMPLETELY Upgradeable Laptop?",
      "author_name": "Linus Tech Tips",
      "thumbnail_url": "https://i.ytimg.com/vi/0rkTgPt3M4k/hqdefault.jpg",
    },
    {
      "id": nanoid(),
      "videoId": "YZdMHL8IpBk",
      "title": "Steam Deck: Valve Demos its Unique Trackpad and Gyroscopic Controls",
      "author_name": "IGN",
      "thumbnail_url": "https://i.ytimg.com/vi/YZdMHL8IpBk/hqdefault.jpg",
    }
  ],
  loading: false,
};

export const addVideoAsync = createAsyncThunk(
  'playlist/addVideo',
  async ({videoToBeAdded, onComplete}) => {
    try {
      const response = await addVideo(videoToBeAdded);
      onComplete();
      return response;
    } catch (error) {
      onComplete();
      throw error;
    }
    
  }
);

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    removeVideo: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addVideoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVideoAsync.rejected, (state) => {
        state.status = 'Error loading youtube video';
        state.loading = false;
        notification.error({
          message: 'Error loading video',
        });
      })
      .addCase(addVideoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [
          action.payload,
          ...state.data,
        ];
      });
  },
});

export const { removeVideo } = playlistSlice.actions;

export const selectPlaylist = (state) => state.playlist;


export default playlistSlice.reducer;
