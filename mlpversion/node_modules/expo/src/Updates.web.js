export function reload() {
  window.location.reload(true);
}

export function checkForUpdateAsync() {
  return true;
}

export function fetchUpdateAsync() {
  window.location.reload();
}

export function addListener() {
  return {
    remove() {},
  };
}
