export function q(selector, ctx = document) {
  return ctx.querySelector(selector);
}

export function qa(selector, ctx = document) {
  return Array.from(ctx.querySelectorAll(selector));
}
