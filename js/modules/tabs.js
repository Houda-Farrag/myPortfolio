/* ==========================
File: /js/modules/tabs.js
Purpose: Simple tab behavior encapsulated
========================== */
import { qa, q } from "../utils/dom.js";


export function createTabs({ tabBtnSelector = '.tab-btn', tabContentSelector = '.tab-content' } = {}) {
const buttons = qa(tabBtnSelector);
const contents = qa(tabContentSelector);


function onClick() {
const id = this.getAttribute('data-tab');
if (!id) return;


buttons.forEach(b => b.classList.remove('active'));
contents.forEach(c => c.classList.remove('active'));


this.classList.add('active');
const el = q(`#${id}`);
el?.classList.add('active');
}


return {
init() {
buttons.forEach(btn => btn.addEventListener('click', onClick));
}
};
}