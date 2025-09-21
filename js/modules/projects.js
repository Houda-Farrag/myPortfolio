/* ==========================
File: /js/modules/projects.js
Purpose: Load and filter project cards, animate on enter
========================== */
import { qa } from "../utils/dom.js";


export function createProjects({ filterBtnSelector = '.filter-btn', projectCardSelector = '.project-card' } = {}) {
const filterBtns = qa(filterBtnSelector);
const projectCards = qa(projectCardSelector);


function filter(value) {
projectCards.forEach(card => {
const cats = card.getAttribute('data-categories') || '';
if (value === 'all' || cats.includes(value)) card.style.display = 'flex';
else card.style.display = 'none';
});
}


function initFilter() {
if (!filterBtns.length) return;
filterBtns.forEach(btn => btn.addEventListener('click', () => {
filterBtns.forEach(b => b.classList.remove('active'));
btn.classList.add('active');
const val = btn.getAttribute('data-filter');
filter(val);
}));
}


function initAnimation() {
if (!projectCards.length) return;
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.animationPlayState = 'running';
observer.unobserve(entry.target);
}
});
}, { threshold: 0.5 });


projectCards.forEach(card => {
card.style.animationPlayState = 'paused';
observer.observe(card);
});
}


return {
init() {
initFilter();
initAnimation();
}
};
}