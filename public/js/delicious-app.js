/*
 * This source file is subject to the license that is bundled with this package in the file LICENSE.
 */
import {$, $$} from './modules/bling';
import autocomplete from './modules/autocomplete';

autocomplete($('#address'), $('#lat'), $('#lng'));
