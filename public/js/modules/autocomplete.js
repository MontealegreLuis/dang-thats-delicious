/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
function autocomplete(address, latitude, longitude) {
    if (!address) return;
    const dropdown = new google.maps.places.Autocomplete(address);
    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        latitude.value = place.geometry.location.lat();
        longitude.value = place.geometry.location.lng();
    });
    address.on('keydown', (e) => {
        if (e.keyCode === 13) e.preventDefault();
    });
}

export default autocomplete;
