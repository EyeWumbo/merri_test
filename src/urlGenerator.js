import shortid from 'shortid';

export default function(url) {
  // Using shortid package to prevent degrading performance from hash collisions
  // Small project here, but good to be safe if we were considering 100,000+ URL generations.
  const existingShort = window.localStorage.getItem(url);
  if(existingShort) {
    window.localStorage.setItem(existingShort, url);
    return existingShort;
  }
  const shortId = shortid.generate();
  window.localStorage.setItem(url, shortId);
  window.localStorage.setItem(shortId, url);
  return shortId;
}
