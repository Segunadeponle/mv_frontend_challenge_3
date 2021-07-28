// A mock function to mimic making an async request for data
import { nanoid } from 'nanoid';

export function addVideo(videoToBeAdded) {
  return fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent(videoToBeAdded))
  .then(response => response.json())
  .then(data => {
    const { video } = data.html.match(/https:\/\/www\.youtube\.com\/embed\/(?<video>.+)\?feature=oembed/).groups;
    const { title, thumbnail_url } = data;
    
    return Promise.resolve({
      id: nanoid(),
      videoId: video,
      title,
      thumbnail_url,
    })
  })
}
