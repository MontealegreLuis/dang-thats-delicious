/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
import axios from 'axios';
import {$} from './bling';

const mapOptions = {
    center: {lat: 43.2, lng: -79.8},
    zoom: 12
};

function addNearByStoresTo(map, lat = 43.2, lng = -79.8) {
    axios.get(`/api/stores/near?lat=${lat}&lng=${lng}`).then(response => {
        const places = response.data;
        if (!places.length) {
            alert('No places found!');
        }

        const bounds = new google.maps.LatLngBounds();
        const info = new google.maps.InfoWindow();
        const markers = places.map(place => {
            const [lng, lat] = place.location.coordinates;
            const position = {lat, lng};
            bounds.extend(position);
            const marker = new google.maps.Marker({map, position});
            marker.place = place;
            return marker;
        });

        map.setCenter(bounds.getCenter());
        map.fitBounds(bounds);

        markers.forEach(marker => marker.addListener('click', function () {
            info.setContent(`
                <div class="map-popup">
                    <a href="/stores/${this.place.slug}">
                        <img class="map-popup-img" src="/uploads/${this.place.photo || 'store.png'}" alt="${this.place.name}">
                        <p>${this.place.name} - ${this.place.location.address}</p>
                    </a>
                </div>
            `);
            info.open(map, this);
        }))
    });
}

function makeMap(mapDiv) {
    if (!mapDiv) return;

    const map = new google.maps.Map(mapDiv, mapOptions);
    const location = $('[name=geolocate]');
    const autocomplete = new google.maps.places.Autocomplete(location);

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        addNearByStoresTo(map, place.geometry.location.lat(), place.geometry.location.lng());
    });
    addNearByStoresTo(map);
}

export default makeMap;
