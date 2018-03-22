/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
import '../sass/style.sass';

import {$, $$} from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/type-ahead';
import makeMap from './modules/map';
import heart from './modules/heart';

autocomplete($('#address'), $('#lat'), $('#lng'));
typeAhead($('.search'));
makeMap($('#map'));

const heartForms = $$('form.heart');
heartForms.on('submit', heart);
