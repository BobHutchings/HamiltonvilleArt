HamiltonvilleArt.CatBuilder = (function() {
    'use strict';

    var NAME = 'HamiltonvilleArt.CatBuilder';

    // Display the images belonging to the supplied Category Name, in the Main Content area.
    function showCatImages(catName) {
        console.log(`======>>>>>> DISPLAYING: ${catName}`);
    }

    // Public API
    return {
        showCatImages : showCatImages
    };
})();