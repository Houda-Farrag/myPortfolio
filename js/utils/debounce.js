/* ==========================
File: /js/utils/debounce.js
Purpose: Small utility to debounce throttled events
========================== */
export function debounce(fn, wait = 100) {
let timeout;
return (...args) => {
clearTimeout(timeout);
timeout = setTimeout(() => fn.apply(this, args), wait);
};
}