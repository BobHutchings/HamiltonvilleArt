/**
 * Provides standardized AJAX functionality.
 * Useage: let ajaxObj = new HamiltonvilleArt.Ajax();
 * 
 * @class
 */
HamiltonvilleArt.Ajax = function() {
    'use strict';

    var NAME = 'Ajax';
    
    /**
     * Fire off the AJAX request.  No need to validate.  We won't get here unless all required pieces of info are present.
     * 
     * @private
     * @param {Object}   config
     * @param {string}   config.href    - Request URL.
     * @param {string}   config.reqType - Request type.
     * @param {function} config.cb      - Callback function.
     * @param {string}   config.accept  - Accepted MIME type of the response (expressed as: type/sub-type).
     * @param {string}   [config.data]  - Optional data to send as part of the request. 
     */
    function makeRequest(config) {
        var ajaxReq;

        if ( checkConfig(config) ) {
            ajaxReq = new XMLHttpRequest();

            // Success Handler
            // Execute the supplied callback function when the request is complete.
            // Pass a reference to the current XMLHttpRequest instance to the callback function.
            ajaxReq.addEventListener("load", function() {
                HamiltonvilleArt.Log.write({
                    obj: NAME,
                    fun: 'makeRequest',
                    msg: `${config.reqType} request complete.`
                });

                // THIS = the current instance of XMLHttpRequest
                config.cb(this);
            });

            // Error Handler
            ajaxReq.addEventListener("error", () => {
                HamiltonvilleArt.Log.write({
                    obj: NAME,
                    fun: 'makeRequest',
                    msg: `${config.reqType} request FAILED.`,
                    err: true
                });

                // Pass undefined to the callback to indicate failure.
                config.cb(undefined);
            });

            // Abort Handler
            ajaxReq.addEventListener("abort", () => {
                HamiltonvilleArt.Log.write({
                    obj: NAME,
                    fun: 'makeRequest',
                    msg: `${config.reqType} request ABORTED.`,
                    err: true
                });

                // Pass undefined to the callback to indicate failure.
                config.cb(undefined);
            });

            ajaxReq.open(config.reqType, config.href);
            ajaxReq.setRequestHeader('Accept', config.accept);

            // If there's data to send with the request, include it.
            if (config.data) {
                ajaxReq.send(config.data);
            } else {
                ajaxReq.send();
            }

            HamiltonvilleArt.Log.write({
                obj: NAME,
                fun: 'makeRequest',
                msg: `Request Sent: ${config.href}`
            });
        }
    }

    /**
     * Validate the config object passed into one of the public functions
     * 
     * @private
     * @param {Object}   config          - This should always be supplied by the calling function. No need to validate.
     * @param {string}   config.href     - Request URL. If this is missing, there's nothing we can do. Log an error to the console.
     * @param {string}   config.reqType  - Request type. Set by the calling function. No need to validate.
     * @param {string}   [config.accept] - Accepted MIME type of the response (expressed as: type/sub-type).
     * @param {function} [config.cb]     - Optional callback function. If not supplied, use the default.
     * @param {string}   [config.data]   - Optional data to send as part of the request. No need to validate.
     * @returns {boolean}
     */
    function checkConfig(config) {

        // Did we get a request url?
        if ( (typeof config.href !== 'string') || (config.href.length === 0) ) {
            HamiltonvilleArt.Log.write({
                obj: NAME,
                fun: 'checkConfig',
                msg: 'Missing or invalid request URL.',
                err: true
            });

            return false;
        }

        // Was a Callback Function supplied?  If not, use the default.
        config.cb = (typeof config.cb === 'function') ? config.cb : () => {};

        // Did we get a MIME Type?  If not, default to "application/json".
        config.accept = (typeof config.accept === 'string') && (config.accept.length > 0) && (config.accept.indexOf('/') !== -1)
            ? config.accept
            : 'application/json';

        // Good to go!
        return true;
    }

    /**
     * Async AJAX GET request
     * 
     * @public
     * @param {Object}   config
     * @param {string}   config.href     - Request URL
     * @param {string}   [config.accept] - Accepted MIME type of the response (expressed as: type/sub-type) 
     * @param {function} [config.cb]     - Optional callback function
     * @param {string}   [config.data]   - Optional request data
     */
    this.ajaxGet = function(config) {
        config = (typeof config === 'object') ? config : {};
        config.reqType = 'GET';
        makeRequest(config);
    };

    /**
     * Async AJAX POST request
     * 
     * @public
     * @param {Object}   config
     * @param {string}   config.href     - Request URL
     * @param {string}   [config.accept] - Accepted MIME type of the response (expressed as: type/sub-type) 
     * @param {function} [config.cb]     - Optional callback function
     * @param {string}   [config.data]   - Optional request data
     */
    this.ajaxPost = function(config) {
        config = (typeof config === 'object') ? config : {};
        config.reqType = 'POST';
        makeRequest(config);
    };
};