/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
import axios from 'axios';
import {$} from './bling';

function ajaxHeart(e) {
    e.preventDefault();
    axios
        .post(this.action)
        .then(response => {
            const isHearted = this.heart.children[0].classList.toggle('text-danger');
            const hearts = response.data.hearts;

            $('.heart-count').textContent = hearts.length;
        })
        .catch(error => {
            console.error(error);
        })
    ;
}

export default ajaxHeart;
