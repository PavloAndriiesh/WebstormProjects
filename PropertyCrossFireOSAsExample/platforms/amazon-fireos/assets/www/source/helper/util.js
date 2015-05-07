/**
 * @class RAD.util
 */
RAD.namespace('util', {
    isLocalStorageSupported: function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }
});
/** @type RAD.util */
RAD.util;
