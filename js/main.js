// Application Namespace
var HamiltonvilleArt = {};

// Initialize the app.
(function() {
    'use strict';

    // Figure out when the Image Loader has finished doing its thing
    var interval = window.setInterval(
        function() {
            var imgCats;

            if (HamiltonvilleArt.ImageLoader) {
                if (HamiltonvilleArt.ImageLoader.getReadyState()) {
                    HamiltonvilleArt.Log.write({
                        obj: 'Main',
                        fun: 'Main',
                        msg: 'Hamiltonville Art Website initialized!'
                    });

                    // Turn off the "loading" gif.
                    document.getElementById('hva_loading').style.display = "none";
                    
                    // Build the Nav using the available Image Categories.
                    imgCats = HamiltonvilleArt.ImageLoader.getImgCats();
                    HamiltonvilleArt.NavBuilder.buildNav(imgCats);

                    window.clearInterval(interval);
                }
            }
        }, 100
    );
})();