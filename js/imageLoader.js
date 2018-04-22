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
            var catCount = 0;

            try {
                var i, j;
                var cfgData = JSON.parse(respStr);

                // Build the Image Cache object.
                for (i = 0; i < cfgData.artworkImgs.length; i++) {
                    imgCache[ cfgData.artworkImgs[i].dirName ] = [];
                    catCount++;

                    for (j = 0; j < cfgData.artworkImgs[i].files.length; j++) {
                        var img = new Image();
                        var path = 'assets/' + cfgData.artworkImgs[i].dirName + '/' + cfgData.artworkImgs[i].files[j];
                        
                        // Cache the image.
                        imgCache[ cfgData.artworkImgs[i].dirName ].push(path);
                        img.src = path;
                    }
                }

                HamiltonvilleArt.Log.write({
                    obj: NAME,
                    fun: 'loadImages',
                    msg: 'Image Cache successfully populated. Image Category Count = ' + catCount
                });

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
    // Give an Image Category Name (i.e. an image directory name) return the paths for all images in the category.
    function getImgPaths(imgCatName) {
        if (typeof imgCatName === 'string') {
            return imgCache[imgCatName];
        
        } else {
            HamiltonvilleArt.Log.write({
                obj: NAME,
                fun: 'getImgPaths',
                msg: 'ERROR. Invalid/Missing Image Category Name.'
            });

            return undefined;
        }
    }

    // API Function: Get Image Categories.
    // Returns an array of the the available image categories.
    // Category names are also image directory names.
    function getImgCats() {
        return Object.keys(imgCache);
    }

    // Public API
    return {
        getImgPaths : getImgPaths,
        getImgCats  : getImgCats
    };
})();