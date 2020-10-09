
function hasSupport() {
  return window && window.navigator && window.navigator.vibrate;
}

export function buzz() {
  if (hasSupport()) {
    window.navigator.vibrate(200);
  }
}

export function trumpet() {
  if (hasSupport()) {
    window.navigator.vibrate([200, 50, 1200]);
  }
}
