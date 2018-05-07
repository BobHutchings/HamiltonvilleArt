HamiltonvilleArt.ImageLoader = (function() {
    'use strict';

    var NAME = 'HamiltonvilleArt.ImageLoader';
    var isReady = false; // Set to TRUE when loadImages() is done.
    var defaultCat;

    // Image Cache - POJO
    // Each property corresponds to a Dir name on the server, containing a given set of image files.
    // The value of each property is an Object that looks like this:
    // {
    //    files: <Array of image file names. All of which have been cached by the browser.>
    //    captions: <Array of Strings. 1 for each file in the "files" Array.>
    // }
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
                    imgCache[ cfgData.artworkImgs[i].dirName ] = Object.create(null);
                    imgCache[ cfgData.artworkImgs[i].dirName ].files = [];
                    imgCache[ cfgData.artworkImgs[i].dirName ].captions = [];

                    catCount++;

                    for (j = 0; j < cfgData.artworkImgs[i].files.length; j++) {
                        var img = new Image();
                        var path = 'assets/' + cfgData.artworkImgs[i].dirName + '/' + cfgData.artworkImgs[i].files[j].path;
                        var text = cfgData.artworkImgs[i].files[j].caption;
                        
                        // Cache the image.
                        imgCache[ cfgData.artworkImgs[i].dirName ].files.push(path);
                        imgCache[ cfgData.artworkImgs[i].dirName ].captions.push(text);
                        img.src = path;
                    }
                }

                // Figure out which Image Category is the default.
                // The default category will be displayed when the site initially loads.
                for (i = 0; i < cfgData.artworkImgs.length; i++) {
                    if (cfgData.artworkImgs[i].default) {
                        defaultCat = cfgData.artworkImgs[i].dirName;
                        break;
                    }
                }
                
                // Make sure we got a default category.
                // If not, just use the first one.
                if (!defaultCat) {
                    defaultCat = cfgData.artworkImgs[0].dirName;
                }

                HamiltonvilleArt.Log.write({
                    obj: NAME,
                    fun: 'loadImages',
                    msg: 'Image Cache successfully populated. Image Category Count = ' + catCount
                });

                isReady = true;

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
            return imgCache[imgCatName].files;
        
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

    // API Function: Get Ready State.
    // Return a Boolean indicating whether or not the Image Cache has finished initializing.
    function getReadyState() {
        return isReady;
    }

    // API Function: Get Default Category Name
    // This is the category of images to show when the site first loads.
    function getDefaultCat() {
        return defaultCat;
    }

    // Public API
    return {
        getImgPaths   : getImgPaths,
        getImgCats    : getImgCats,
        getReadyState : getReadyState,
        getDefaultCat : getDefaultCat
    };
})();