
import cookies from './utils/vendor.cookies.js';
import store from './utils/vendor.store.js';

import GlobalHelpers from './class/GlobalHelpers.js';
import LocationHelpers from './class/LocationHelpers.js';

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
        this.version = '0.7.1';

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
        this.cookies = cookies(function() {});
    }
}

export default Utilify;
