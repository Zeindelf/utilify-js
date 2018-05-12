
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
        this.version = '0.3.0';

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
    }
}

export default Utilify;
