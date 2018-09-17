
import {initCookies} from './utils/vendor.cookies';
import store from './utils/vendor.store';

import GlobalHelpers from './class/GlobalHelpers';
import LocationHelpers from './class/LocationHelpers';

/**
 * Create a Utilify class
 * Main class
 */
class Utilify {
    constructor() {
        /**
         * Version
         * @type {String}
         */
        this.version = '0.10.1';

        /**
         * Package name
         * @type {String}
         */
        this.name = '@UtilifyJS';

        /**
         * Global Helpers instance
         * @type {GlobalHelpers}
         */
        this.globalHelpers = new GlobalHelpers();

        /**
         * Location Helpers instance
         * @type {LocationHelpers}
         */
        this.locationHelpers = new LocationHelpers(store);

        /**
         * Local/Session Storage
         * @type {Object}
         */
        this.storage = store;

        /**
         * JS Cookies
         * @type {Object}
         */
        this.cookies = initCookies(function() {});
    }
}

export default Utilify;
