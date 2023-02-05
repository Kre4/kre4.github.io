function getPelmeniData() {
    return fetch('https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=Hello%20world&choe=UTF-8')//'https://my-json-server.typicode.com/kre4/mock/beb')
        .then(response => {
            console.log(response);
            return response.blob()});
}

