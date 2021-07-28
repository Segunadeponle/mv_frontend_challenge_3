import playlistReducer, {
  removeVideo,
  addVideoAsync,
} from './playlistSlice';

describe('playlist reducer', () => {
  const initialState = {
    data: [
      {
        "id": 1,
        "videoId": "0rkTgPt3M4k",
        "title": "A COMPLETELY Upgradeable Laptop?",
        "author_name": "Linus Tech Tips",
        "thumbnail_url": "https://i.ytimg.com/vi/0rkTgPt3M4k/hqdefault.jpg",
      },
      {
        "id": 2,
        "videoId": "YZdMHL8IpBk",
        "title": "Steam Deck: Valve Demos its Unique Trackpad and Gyroscopic Controls",
        "author_name": "IGN",
        "thumbnail_url": "https://i.ytimg.com/vi/YZdMHL8IpBk/hqdefault.jpg",
      }
    ],
    loading: false,
  };
  it('should handle initial state', () => {
    const actual = playlistReducer(undefined, { type: 'unknown' });
    expect(actual.data[0].title).toEqual(initialState.data[0].title);
    expect(actual.data[0].thumbnail_url).toEqual(initialState.data[0].thumbnail_url);
  });

  it('should handle remove video', () => {
    const actual = playlistReducer(initialState, removeVideo(1));
    expect(actual.data.length).toEqual(1);
  });

  it('should handle add video', () => {
    
    const action = {
      type: addVideoAsync.fulfilled,
      payload: {
        "id": 3,
        "videoId": "sdhfssdg",
        "title": "Steam Deck",
        "author_name": "IGN",
        "thumbnail_url": "https://i.ytimg.com/vi/sdhfssdg/hqdefault.jpg",
      }
    }

    const actual = playlistReducer(initialState, action);
    
    expect(actual.data.length).toEqual(3);

    expect(actual.data[0].title).toEqual(action.payload.title);
    expect(actual.data[0].thumbnail_url).toEqual(action.payload.thumbnail_url);
  });


});
