export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function capitalize(str: string) {
  if (!str) return;
  let arr = str.split('-');
  let capitalized = arr.map(
    (item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
  );
  return capitalized.join(' ');
}

export function formatReadableTime(timestamp: Date | number) {
  // assumes timestamp is a UTC Epoch
  const time = new Date(timestamp);

  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function timeoutRepeater(
  callback: () => void,
  minDelay = 1000,
  maxDelay = 10000
) {
  let timeout: any;
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

export const randomIndex = (arr: number[]) => {
  return randInt(0, arr.length - 1);
};

export const addToast = (
  message: string,
  hideClose: boolean,
  closeAfter: number
) => {
  const toastStack = document.querySelector(
    'rux-toast-stack'
  ) as HTMLRuxToastStackElement;

  toastStack.addToast({
    message: message,
    hideClose: hideClose,
    closeAfter: closeAfter,
  });
};
