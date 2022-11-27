function highlightElement(element) {
    element.style.color = '#9f6fFf';
    element.style.fontSize = '20px';
    element.style.borderLeftStyle = 'solid';
    element.style.borderRightStyle = 'solid';
    element.style.borderColor = '#6a2cce';
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

    document.getElementById(pageMap["index.html"]).onclick = function () {
        location.href = "./index.html";
    }
    document.getElementById(pageMap["index2.html"]).onclick = function () {
        location.href = "./index2.html";
    }

});
