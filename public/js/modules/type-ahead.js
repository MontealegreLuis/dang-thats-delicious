/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
const axios = require('axios');

function typeAhead(search) {
    if (!search) return;

    const searchInput = search.querySelector('[name="search"]');
    const searchResults = search.querySelector('.search-results');

    searchInput.on('input', function () {
        if (!this.value) {
            searchResults.style.display = 'none';
            return;
        }

        searchResults.style.display = 'block';
        searchResults.innerHTML = '';

        axios
            .get(`/api/search?q=${this.value}`)
            .then(response => {
                if (response.data.length) searchResults.innerHTML = searchResultsHTML(response.data);
            })
            .catch(error => console.error(error))
        ;
    });
}

function searchResultsHTML(stores) {
    return stores.map(store => {
        return `
            <a class="search-result" href="/stores/${store.slug}">
                <strong>${store.name}</strong>
            </a>
        `;
    }).join('');
}

export  default  typeAhead;
