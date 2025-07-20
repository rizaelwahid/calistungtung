export function loadJSON(path) {
  return fetch(path).then((res) => res.json());
}

export function playAudio(src) {
  new Audio(src).play();
}
