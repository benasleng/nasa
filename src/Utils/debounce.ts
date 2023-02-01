let debounceTimer: number;

export const debounce = (callback: () => void, time: number) => {
  window.clearTimeout(debounceTimer);

  debounceTimer = window.setTimeout(callback, time);
}