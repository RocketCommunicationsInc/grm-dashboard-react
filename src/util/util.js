export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function capitalize(val) {
  if (!val) return;
  return val.charAt(0).toUpperCase() + val.substring(1);
}

export function formatReadableTime(timestamp) {
  // assumes timestamp is a UTC Epoch
  const time = new Date(timestamp);

  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
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

export const randomIndex = (arr) => {
  return randInt(0, arr.length - 1);
};
