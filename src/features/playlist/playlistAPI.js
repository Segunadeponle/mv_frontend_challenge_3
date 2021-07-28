// A mock function to mimic making an async request for data
export function addVideo(videoToBeAdded) {
  return fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent(videoToBeAdded))
  .then(response => response.json())
  .then(data => {
    const { id } = data.html.match(/https:\/\/www\.youtube\.com\/embed\/(?<id>.+)\?feature=oembed/).groups;
    const { title, thumbnail_url } = data;
    
    return Promise.resolve({
      id,
      title,
      thumbnail_url,
    })
  })
}
