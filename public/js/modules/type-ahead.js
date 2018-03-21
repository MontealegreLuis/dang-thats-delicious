/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
const axios = require('axios');
const purify = require('dompurify');

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

        axios
            .get(`/api/search?q=${this.value}`)
            .then(response => {
                if (response.data.length) {
                    searchResults.innerHTML = purify.sanitize(searchResultsHTML(response.data));
                    return;
                }
                searchResults.innerHTML = purify.sanitize(`No results for ${this.value} found!`);
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
