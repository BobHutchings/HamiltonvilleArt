HamiltonvilleArt.NavBuilder = (function() {
    'use strict';

    // Use the information gathered by the Image Loader, to build the Nav
    // Takes an array of strings, representing the differnt categories of artwork available in the nav.
    function buildNav(cats) {
        let navElmt = document.getElementById('hva_main-nav');

        // Sanity check the function param.
        // We'll know it's an Array if the length is greater than 1
        // Within the context of this app, there *will* be more than 1 category of images to display.
        if ((typeof cats === 'object') && (cats.length > 1)) {

        }
    }

    // Public API
    return {
        buildNav : buildNav
    };
})();