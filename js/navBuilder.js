HamiltonvilleArt.NavBuilder = (function() {
    'use strict';

    // Use the information gathered by the Image Loader, to build the Nav
    // Takes an array of strings, representing the differnt categories of artwork available in the nav.
    function buildNav(cats) {
        var navElmt = document.getElementById('hva_main-nav');
        var i;

        // Sanity check the function param.
        // We'll know it's an Array if the length is greater than 1
        // Within the context of this app, there *will* be more than 1 category of images to display.
        if ((typeof cats === 'object') && (cats.length > 1)) {
            for (i = 0; i < cats.length; i++) {
                var div = document.createElement('div');
                var txt = document.createTextNode(cats[i]);
                var aClass = document.createAttribute('class');
                var aId = document.createAttribute('id');

                aClass.value = 'hva_cat-link';
                aId.value = 'hva_' + cats[i];

                div.setAttributeNode(aClass);
                div.setAttributeNode(aId);
                div.appendChild(txt);

                navElmt.appendChild(div);
            }

            // Click Event handler for the nav
            navElmt.addEventListener('click', onNavClick);
        }
    }

    // The user has clicked a Nav link.
    function onNavClick(evt) {
        console.dir(evt);
    }

    // Public API
    return {
        buildNav : buildNav
    };
})();