// Application Namespace
var HamiltonvilleArt = {};

// Initialize the app.
(function() {
    'use strict';

    // Figure out when the Image Loader has finished doing its thing
    var interval = window.setInterval(
        function() {
            if (HamiltonvilleArt.ImageLoader) {
                if (HamiltonvilleArt.ImageLoader.getReadyState()) {
                    HamiltonvilleArt.Log.write({
                        obj: 'Main',
                        fun: 'Main',
                        msg: 'Hamiltonville Art Website initialized!'
                    });

                    document.getElementById('hva_loading').style.display = "none";
                    window.clearInterval(interval);
                }
            }
        }, 100
    );
})();