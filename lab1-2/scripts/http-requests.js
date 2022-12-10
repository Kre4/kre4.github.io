function getPelmeniData(extraTimeOut) {
    return fetch('https://my-json-server.typicode.com/kre4/mock/beb')
        .then(response => response.json());
}

