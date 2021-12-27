import { getElement } from './utils.js';
let toggleNav = getElement('.toggle-nav');
let closeBtn = getElement('.sidebar-close');
let sidebarOverlay = getElement('.sidebar-overlay')
toggleNav.addEventListener('click', () => {
    sidebarOverlay.classList.add('show');
})
closeBtn.addEventListener('click', () => {
    sidebarOverlay.classList.remove('show');
})