function highlightElement(element) {
    element.style.color = '#9f6fFf';
    element.style.fontSize = '20px';
    element.style.borderLeftStyle = 'solid';
    element.style.borderRightStyle = 'solid';
    element.style.borderColor = '#6a2cce';
}

document.addEventListener('DOMContentLoaded', _ => {

    const dict = {
        'index2.html': 'second-page-nav',
        'index.html': 'main-page-nav',
    };
    const activePageId = dict[document.location.pathname.split('/').pop()];
    const navElement = document.getElementById(activePageId);
    highlightElement(navElement);

    document.getElementById(dict["index.html"]).onclick = function () {
        location.href = "./index.html";
    }
    document.getElementById(dict["index2.html"]).onclick = function () {
        location.href = "./index2.html";
    }

});
