(function () {
    let startTime = new Date().getTime();

    function timer() {
        let element = document.getElementById('load-time');
        element.innerHTML += 'Loaded in ' + (new Date().getTime() - startTime) / 1000 + ' seconds';
    }

    window.onload = function () {
        console.log('Window load listener','Loaded in ' + (new Date().getTime() - startTime) / 1000 + ' seconds')
        timer();
    }

    document.addEventListener('DOMContentLoaded', _ => {
        console.log('Dom listener','Loaded in ' + (new Date().getTime() - startTime) / 1000 + ' seconds')
    })
})();
