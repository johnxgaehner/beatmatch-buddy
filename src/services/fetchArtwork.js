export default async function fetchArtwork(newTrack) {
  const authEndpoint = "https://accounts.spotify.com/api/token";
  const authString =
    "55b9f829a2e7449da28119bc679d6b70:5d3899109bb040f5b708ff630c8630be";
  const authorization = Buffer.from(authString).toString("base64");

  const authToken = await fetch(authEndpoint, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authorization}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.access_token)
    .catch((error) => console.dir(error));

  const apiEndpoint = "https://api.spotify.com/v1/search";
  const artistSearchParam = newTrack.artistName
    .replace(/ /g, "+")
    .replace(/[^a-zA-Z0-9+äÄöÖüÜß]/g, "");
  const trackSearchParam = newTrack.trackTitle
    .replace(/ +/g, "+")
    .replace(/[^a-zA-Z0-9+äÄöÖüÜß]/g, "");
  const searchUrl = `${apiEndpoint}?q=${artistSearchParam}+${trackSearchParam}&type=album,track&limit=1`;

  const artworkUrl = await fetch(searchUrl, {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) =>
      data.tracks.items[0].album.images[2].url
        ? data.tracks.items[0].album.images[2].url
        : data.albums.items[0].images[2].url
    )
    .catch((error) => console.dir(error));

  return artworkUrl;
}
