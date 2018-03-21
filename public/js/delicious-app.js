/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
import '../sass/style.sass';

import {$, $$} from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/type-ahead';

autocomplete($('#address'), $('#lat'), $('#lng'));
typeAhead($('.search'));
