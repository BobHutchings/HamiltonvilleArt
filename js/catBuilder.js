HamiltonvilleArt.CatBuilder = (function() {
    'use strict';

    var NAME = 'HamiltonvilleArt.CatBuilder';

    // Display the images belonging to the supplied Category Name, in the Main Content area.
    function showCatImages(catName) {
        var i, imgPaths, imgContainer;

        if (typeof catName === 'string' && catName.length > 0) {
            imgPaths = HamiltonvilleArt.ImageLoader.getImgPaths(catName);
            imgContainer = document.getElementById('hva_main');

            if (imgContainer instanceof HTMLElement) {
                imgContainer.innerHTML = '';

                for (i = 0; i < imgPaths.length; i++) {
                    var img = document.createElement('img');
                    var aClass = document.createAttribute('class');
                    var aSrc = document.createAttribute('src');

                    aClass.value = 'hva_cat-img';

                    if (i === 0) {
                        aClass.value += ' first';
                    
                    } else if (i === (imgPaths.length - 1)) {
                        aClass.value += ' last';
                    }

                    aSrc.value = imgPaths[i];

                    img.setAttributeNode(aClass)
                    img.setAttributeNode(aSrc);
                    imgContainer.appendChild(img);
                }
            
            } else {
                HamiltonvilleArt.Log.write({
                    obj: NAME,
                    fun: 'showCatImages',
                    msg: 'ERROR. Unable to display images. Image container element is missing.'
                });    
            }

        
        } else {
            HamiltonvilleArt.Log.write({
                obj: NAME,
                fun: 'showCatImages',
                msg: 'ERROR. Unable to display images. Missing or invalid category name.'
            });
        }
    }

    // Public API
    return {
        showCatImages : showCatImages
    };
})();