/* ==========================
File: /js/modules/navigation.js
Purpose: Navigation and mobile menu handling (SRP: only navigation)
========================== */
import { smoothScrollTo } from "../utils/scroll.js";
import { qa } from "../utils/dom.js";

export function createNavigation({
  hamburgerSelector,
  navMenuSelector,
  navLinkSelector,
  headerSelector,
  mobileBreakpoint = 768,
}) {
  const hamburger = document.querySelector(hamburgerSelector);
  const navMenu = document.querySelector(navMenuSelector);
  const navLinks = qa(navLinkSelector);
  const header = document.querySelector(headerSelector);
}

function addBackdrop() {
  if (!document.querySelector(".mobile-backdrop")) {
    const backdrop = document.createElement("div");
    backdrop.className = "mobile-backdrop";
    backdrop.addEventListener("click", closeMenu);
    document.body.appendChild(backdrop);
  }
}

function removeBackdrop() {
  const backdrop = document.querySelector(".mobile-backdrop");
  if (backdrop) backdrop.remove();
}

function openMenu() {
  hamburger?.classList.add("active");
  navMenu?.classList.add("active");
  document.body.classList.add("no-scroll");
  addBackdrop();
}

function closeMenu() {
  hamburger?.classList.remove("active");
  navMenu?.classList.remove("active");
  document.body.classList.remove("no-scroll");
  removeBackdrop();
}
