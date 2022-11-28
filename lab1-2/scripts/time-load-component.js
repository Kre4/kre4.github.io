(function () {
    let startTime = new Date().getTime();

    function timer() {
        let element = document.getElementById('load-time');
        console.log(element)
        element.innerHTML += 'Loaded in ' + (new Date().getTime() - startTime) / 1000 + ' seconds';
    }

    window.onload = function () {
        timer();
        console.log('window on load done')
    }
})();
