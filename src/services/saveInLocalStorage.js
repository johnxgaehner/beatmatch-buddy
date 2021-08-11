export default function saveInLocalStorage(key, value) {
  const newObject = JSON.parse(localStorage.getItem(key)) || [];
  newObject.push(value);

  localStorage.setItem(key, JSON.stringify(newObject));
}

// key = savedTracks
// value = newTrack
