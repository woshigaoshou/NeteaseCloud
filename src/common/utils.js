export function debounce(func, delay) {
  var timer = null;
  return function (...arg) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, ...arg);
    }, delay)
  }

}

export function throttle(func, delay, context) {
  let timeout;
  return function () {
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, delay)
    }

  }
}