HamiltonvilleArt.ImageLoader = (function() {

    // Get ImageLoader configuration data
    var ajax = new HamiltonvilleArt.Ajax();

    ajax.get({
        href: '/data/image-loader.json',
        cb: loadImages
    });

    // Callback Function:  Load Artwork Images.
    function loadImages(reqObj) {
        console.dir(reqObj);
    }

    // API Function: Get Images
    function getImages(imgDirName) {

    }

    // Public API
    return {
        getImages: getImages
    };
})();