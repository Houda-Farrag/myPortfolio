/* ==========================
File: /js/utils/scroll.js
Purpose: Centralized smooth-scroll helper (open for extension)
========================== */
export function smoothScrollTo(selectorOrElement, { offset = 0 } = {}) {
const target =
typeof selectorOrElement === "string"
? document.querySelector(selectorOrElement)
: selectorOrElement;


if (!target) return;


const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
window.scrollTo({ top, behavior: "smooth" });
}