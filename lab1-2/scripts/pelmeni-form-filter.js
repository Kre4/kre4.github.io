(function () {
    class PelmeniDecription {
        constructor(name, price, professionalRating, publicRating) {
            this.name = name;
            this.price = price;
            this.professionalRating = professionalRating;
            this.publicRating = publicRating;
        }
    }

    const dataForVeryBadTimes = [
        new PelmeniDecription('Дымов', 344, 3, 6),
        new PelmeniDecription('Папа может', 311, 9, 6),
        new PelmeniDecription('Ермолино', 153, 5, 5),
        new PelmeniDecription('Цезарь Nero', 423, 10, 10),
        // to be continued...
    ];

    let costRadioButtonCurrentValue = 0;
    let rateRadioButtonCurrentValue = 0;

    function restorePreviousRequest() {
        let brandName = localStorage.getItem('brand');
        let costRB = localStorage.getItem('price');
        let rateRB = localStorage.getItem('rate');

        if (brandName)
            document.getElementById('brand-input').value = brandName;


        if (costRB) {
            const costButtons = document.getElementsByName('cost');
            for (let i = 0, length = costButtons.length; i < length; i++) {
                if (costButtons[i].value === costRB)
                    costButtons[i].checked = true;
            }
        }

        if (rateRB) {
            const ratingButtons = document.getElementsByName('rate');
            for (let i = 0, length = ratingButtons.length; i < length; i++) {
                if (ratingButtons[i].value === rateRB)
                    ratingButtons[i].checked = true;
            }
        }
    }

    function listenDataSubmit() {
        document.getElementById('submit-form').onclick = function (event) {
            event.preventDefault();
            requestAndProcessPelmeniData()
        }
    }

    function requestAndProcessPelmeniData() {
        document.getElementById('filtered-result').style.display = 'none';
        startLoadingAnimation()
        getPelmeniData().then(successResult => filterData(successResult), error => onError(error))
            .finally(() => stopLoadingAnimation())
    }

    function onError(error) {
        document.getElementById('http-error-placeholder').style.display = 'unset';
    }

    function startLoadingAnimation() {
        document.getElementById('http-error-placeholder').style.display = 'none'
        const elem = document.getElementById('http-request-placeholder');
        elem.className = ''
        elem.classList.add('loader')
    }

    function stopLoadingAnimation() {
        const elem = document.getElementById('http-request-placeholder');
        elem.className = ''
        elem.classList.add('hided');
    }

    function filterData(data) {
        console.log(data)
        let filteredData = data;

        let brandName = document.getElementById('brand-input').value;
        if (brandName)
            filteredData = filteredData.filter(pelmeni => pelmeni.name.includes(brandName));
        if (!filteredData || filteredData.length === 0)
            alert('По вашему запросу ничего не найдено(');
        // filter by price
        if (costRadioButtonCurrentValue !== 0) {
            filteredData = filteredData.sort(function (a, b) {
                if (a.price > b.price)
                    return -costRadioButtonCurrentValue;
                if (a.price < b.price)
                    return costRadioButtonCurrentValue;
                return 0;
            })
        }

        if (rateRadioButtonCurrentValue !== 0) {
            filteredData = filteredData.sort(function (a, b) {
                if (a.publicRating > b.publicRating)
                    return -rateRadioButtonCurrentValue;
                if (a.publicRating < b.publicRating)
                    return rateRadioButtonCurrentValue;
                return 0;
            })
        }

        localStorage.clear();
        localStorage.setItem('brand', brandName);
        localStorage.setItem('price', costRadioButtonCurrentValue);
        localStorage.setItem('rate', rateRadioButtonCurrentValue);
        insertDataInTable(filteredData);
    }

    function insertDataInTable(filteredData) {
        const tbody = document.getElementById('table-content');
        tbody.innerHTML = '';

        if (filteredData && filteredData.length > 0) {
            filteredData.forEach(description => {
                const tbody = document.querySelector("tbody");
                const template = document.querySelector('#pelmenirow');
                const clone = template.content.cloneNode(true);
                let td = clone.querySelectorAll("td");
                td[0].textContent = description.name;
                td[1].textContent = description.price;
                td[2].textContent = description.professionalRating;
                td[3].textContent = description.publicRating;

                tbody.appendChild(clone);
            });
            document.getElementById('filtered-result').style.display = 'block';
        }
    }

    function controlRadioButtonsFilter() {
        const costButtons = document.getElementsByName('cost');
        const ratingButtons = document.getElementsByName('rate');

        for (let i = 0, length = costButtons.length; i < length - 1; i++) {
            costButtons[i].addEventListener('change', function () {
                ratingButtons[0].checked = false;
                ratingButtons[1].checked = false;
                ratingButtons[2].checked = true;
                rateRadioButtonCurrentValue = 0;
                costRadioButtonCurrentValue = this.value;
            });
        }

        for (let i = 0, length = ratingButtons.length; i < length - 1; i++) {
            ratingButtons[i].addEventListener('change', function () {
                costButtons[0].checked = false;
                costButtons[1].checked = false;
                costButtons[2].checked = true;
                costRadioButtonCurrentValue = 0;
                rateRadioButtonCurrentValue = this.value;
            });
        }
    }

    function disableDefaultFormSubmit() {
        document.getElementById('filtered-result').style.display = 'none';
        document.getElementById('pelmeni-form').addEventListener('keyup keypress', function (e) {
            let keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                e.preventDefault();
                requestAndProcessPelmeniData()
            }
        })
    }

    document.addEventListener('DOMContentLoaded', _ => {
        restorePreviousRequest();
        disableDefaultFormSubmit();
        listenDataSubmit();
        controlRadioButtonsFilter();
    });

})();