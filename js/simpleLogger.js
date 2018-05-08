/**
 * IIFE.
 * Singleton. 
 * Standardized Logging. 
 * There will only ever be one of these per page.
 * 
 * @class
 * @returns {Object} API
 */
HamiltonvilleArt.Log = (function() {
    'use strict';
    
    /**
     * Output a message to the console.
     * 
     * @param {Object}  config
     * @param {string}  [config.obj] - Optional. The name of the Object writing the message.
     * @param {string}  [config.fun] - Optional. The name of the Function writing the message.
     * @param {boolean} [config.err] - Optional. Is this an error message?
     * @param {string}  config.msg   - Required. The message to write to the console.
     */
    function write(config) {
        var timeStamp;
        var msg;

        // Sanity check the Config Parameter
        config = (typeof config === 'object') ? config : {};
        
        config.obj = (typeof config.obj === 'string')  ? config.obj : 'UnknownObject';
        config.fun = (typeof config.fun === 'string')  ? config.fun : 'UnknownFunction';
        config.msg = (typeof config.msg === 'string')  ? config.msg : '';
        config.err = (typeof config.err === 'boolean') ? config.err : false;

        // No point in outputting anything to the console if there is no message
        if (config.msg.length > 0) {
            // Does the console exist?
            if (console && console.log) {
                timeStamp = '[' + Date() + '] ';
                msg = timeStamp + config.obj + '::' + config.fun + ' - ' + ((config.err) ? 'ERROR: ' : '') + config.msg;
                console.log(msg);
            }
        }
    }

    // Public API
    return {
        write: write
    };
})();