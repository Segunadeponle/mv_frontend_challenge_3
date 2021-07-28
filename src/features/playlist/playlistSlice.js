import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addVideo } from './playlistAPI';
import { notification } from 'antd';


const initialState = {
  data: [
    {
      "id": "0rkTgPt3M4k",
      "title": "A COMPLETELY Upgradeable Laptop?",
      "author_name": "Linus Tech Tips",
      "thumbnail_url": "https://i.ytimg.com/vi/0rkTgPt3M4k/hqdefault.jpg",
    },
    {
      "id": "YZdMHL8IpBk",
      "title": "Steam Deck: Valve Demos its Unique Trackpad and Gyroscopic Controls",
      "author_name": "IGN",
      "thumbnail_url": "https://i.ytimg.com/vi/YZdMHL8IpBk/hqdefault.jpg",
    }
  ],
  loading: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
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
    // The value we return becomes the `fulfilled` action payload
    
    
  }
);

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    removeVideo: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload)
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
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
          placement: 'bottomRight'
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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.playlist.value)`
export const selectPlaylist = (state) => state.playlist;


export default playlistSlice.reducer;
