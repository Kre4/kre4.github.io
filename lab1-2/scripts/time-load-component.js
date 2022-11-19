let startTime = new Date().getTime();

function timer() {
    let element = document.getElementById('load-time');
    element.innerHTML += 'Loaded in ' + (new Date().getTime() - startTime) / 1000 + ' seconds';
}

document.addEventListener('DOMContentLoaded', _ => {
    document.dispatchEvent(new Event("pageLoaded"));
});

document.addEventListener("pageLoaded", _ => {
    timer();
});
