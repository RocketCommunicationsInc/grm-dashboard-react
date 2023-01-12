export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function timeoutRepeater(callback, minDelay = 1000, maxDelay = 10000) {
  let timeout;
  function update() {
    timeout = setTimeout(() => {
      callback();
      update();
    }, randInt(minDelay, maxDelay));
  }
  if (!timeout) {
    update();
  }
  return () => {
    clearTimeout(timeout);
  };
}
