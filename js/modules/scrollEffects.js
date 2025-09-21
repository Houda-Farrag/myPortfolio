/* ==========================
Purpose: Header scrolled state, active section, fade-ins, scroll-to-top button
========================== */
import { debounce } from "../utils/debounce.js";
import { qa, q } from "../utils/dom.js";


export function createScrollEffects({ headerSelector, sectionSelector = 'section', navLinkSelector = '.nav-link', fadeSelector = '.fade-in', scrollTopBtnSelector = '#scrollToTopBtn' } = {}) {
const header = q(headerSelector);
const sections = qa(sectionSelector);
const navLinks = qa(navLinkSelector);
const fadeEls = qa(fadeSelector);
const scrollTopBtn = q(scrollTopBtnSelector);


function check() {
// header shadow
if (header) header.classList.toggle('scrolled', window.scrollY > 50);


// current section
let currentSection = '';
const scrollPosition = window.scrollY + 200;


sections.forEach(section => {
const top = section.offsetTop;
const height = section.offsetHeight;
if (scrollPosition >= top && scrollPosition < top + height) {
currentSection = section.getAttribute('id');
}
});


navLinks.forEach(link => {
const href = link.getAttribute('href') || '';
link.classList.toggle('active', href === `#${currentSection}`);
});


// fade-ins
fadeEls.forEach(el => {
const pos = el.getBoundingClientRect().top;
const winH = window.innerHeight;
el.classList.toggle('visible', pos < winH - 100);
});


// scroll to top visibility
if (scrollTopBtn) {
scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
}
}


function init() {
check();
window.addEventListener('scroll', debounce(check, 100));


if (scrollTopBtn) {
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
}


return { init };
}