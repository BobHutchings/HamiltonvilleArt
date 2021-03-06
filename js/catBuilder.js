HamiltonvilleArt.CatBuilder = (function() {
    'use strict';

    var NAME = 'HamiltonvilleArt.CatBuilder';

    // Display the images belonging to the supplied Category Name, in the Main Content area.
    function showCatImages(catName) {
        var i, imgPaths, imgCaptions, imgContainer;

        if (typeof catName === 'string' && catName.length > 0) {
            imgPaths = HamiltonvilleArt.ImageLoader.getImgPaths(catName);
            imgCaptions = HamiltonvilleArt.ImageLoader.getImgCaptions(catName);
            imgContainer = document.getElementById('hva_main');

            if (imgContainer instanceof HTMLElement) {
                imgContainer.innerHTML = '';

                for (i = 0; i < imgPaths.length; i++) {
                    // DIV to act as a container for the IMG.
                    var div = document.createElement('div');
                    var divClass = document.createAttribute('class');

                    divClass.value = 'hva_cat-img-wrap';

                    if (i === 0) {
                        divClass.value += ' first';
                    
                    } else if (i === (imgPaths.length - 1)) {
                        divClass.value += ' last';
                    }

                    div.setAttributeNode(divClass);

                    // IMG Element to display the piece of artwork.
                    var img = document.createElement('img');
                    var imgClass = document.createAttribute('class');
                    var imgSrc = document.createAttribute('src');

                    imgClass.value = 'hva_cat-img';
                    imgSrc.value = imgPaths[i];

                    img.setAttributeNode(imgClass)
                    img.setAttributeNode(imgSrc);

                    // P element to hold the caption text.
                    var caption = document.createElement('p');
                    var capClass = document.createAttribute('class');

                    capClass.value = 'hva_cat-img-caption';

                    if (imgCaptions[i].length === 0) {
                        capClass.value += ' empty';
                    }

                    caption.setAttributeNode(capClass);
                    caption.textContent = imgCaptions[i];

                    // Add to the DOM
                    div.appendChild(img);
                    div.appendChild(caption);
                    imgContainer.appendChild(div);
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