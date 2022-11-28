function highlightElement(element) {
    element.classList.add('selected');
}

document.addEventListener('DOMContentLoaded', _ => {

    const pageMap = {
        'index2.html': 'second-page-nav',
        'index.html': 'main-page-nav',
    };

    let activePageId = pageMap[document.location.pathname.split('/').pop()];
    if (!activePageId)
        activePageId = 'main-page-nav';
    const navElement = document.getElementById(activePageId);

    highlightElement(navElement);
});
