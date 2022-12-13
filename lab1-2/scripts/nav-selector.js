function highlightElement(element) {
    element.classList.add('selected');
}
const pageMap = {
    'index2.html': 'second-page-nav',
    'index.html': 'main-page-nav',
};
document.addEventListener('DOMContentLoaded', _ => {

    const nav = document.getElementById('nav-side-bar');

    for (const child of nav.children) {
        if (child.pathname === document.location.pathname) {
            highlightElement(child);
            break;
        }
    }
});
