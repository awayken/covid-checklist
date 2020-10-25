
function hasSupport() {
  return window && window.navigator && window.navigator.vibrate;
}

export function buzz() {
  if (hasSupport()) {
    window.navigator.vibrate(100);
  }
}

export function trumpet() {
  if (hasSupport()) {
    window.navigator.vibrate([100, 100, 600]);
  }
}
