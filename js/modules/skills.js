/* ==========================
File: /js/modules/skills.js
Purpose: Skills animation using IntersectionObserver (only do this when element exists)
========================== */
import { q, qa } from "../utils/dom.js";


export function createSkills({ skillsSectionSelector = '.skills', skillItemSelector = '.skill-item' } = {}) {
const skillsSection = q(skillsSectionSelector);
const skillItems = qa(skillItemSelector);


function animate() {
skillItems.forEach(item => {
const level = Number(item.getAttribute('data-skill-level')) || 0;
const fill = item.querySelector('.skill-level-fill');
const percent = item.querySelector('.skill-percent');


if (fill) fill.style.width = `${level}%`;
if (percent) percent.textContent = `${level}%`;
});
}


function init() {
if (!skillsSection) return;


const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
animate();
observer.unobserve(entry.target);
}
});
}, { threshold: 0.2 });


observer.observe(skillsSection);
}


return { init };
}