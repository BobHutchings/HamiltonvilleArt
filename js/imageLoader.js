HamiltonvilleArt.ImageLoader = (function() {
    var NAME = 'HamiltonvilleArt.ImageLoader';

    // Image Cache
    // POJO
    // Each property corresponds to a Dir name on the server, containing a given set of image files.
    // The value of each property is an Array of image file names. All of which have been cached by the browser.
    var imgCache = Object.create(null);

    // Get ImageLoader configuration data
    var ajax = new HamiltonvilleArt.Ajax();

    ajax.get({
        href: '/data/image-loader.json',
        cb: loadImages
    });

    // Callback Function:  Load Artwork Images.
    function loadImages(reqObj) {
        if ((typeof reqObj.response === 'string') || (typeof reqObj.responseText === 'string')) {
            var respStr = (typeof reqObj.response === 'string') ? reqObj.response : reqObj.responseText;

            try {
                var i, j;
                var cfgData = JSON.parse(respStr);

                // Build the Image Cache object.
                for (i = 0; i < cfgData.artworkImgs.length; i++) {
                    imgCache[ cfgData.artworkImgs[i].dirName ] = [];

                    for (j = 0; j < cfgData.artworkImgs[i].files.length; j++) {
                        var img = new Image();
                        var path = 'assets/' + cfgData.artworkImgs[i].dirName + '/' + cfgData.artworkImgs[i].files[j];
                        
                        // Cache the image.
                        imgCache[ cfgData.artworkImgs[i].dirName ].push(path);
                        img.src = path;
                    }
                }

                console.dir(imgCache);

            } catch (err) {
                HamiltonvilleArt.Log.write({
                    obj: NAME,
                    fun: 'loadImages',
                    msg: 'ERROR. ' + err.message
                });    
            }
        
        } else {
            HamiltonvilleArt.Log.write({
                obj: NAME,
                fun: 'loadImages',
                msg: 'ERROR. Failed to retrieve Image Loader config data.'
            });
        }
    }

    // API Function: Get Images
    function getImages(imgDirName) {

    }

    // Public API
    return {
        getImages: getImages
    };
})();