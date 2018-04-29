HamiltonvilleArt.NavBuilder = (function() {
    'use strict';

    var navElmt;
    var NAME = 'HamiltonvilleArt.NavBuilder';

    // Use the information gathered by the Image Loader, to build the Nav
    // Takes an array of strings, representing the differnt categories of artwork available in the nav.
    function buildNav(cats) {
        var i;

        // Hamiltonville Art site navigation container.
        navElmt = document.getElementById('hva_main-nav');

        // Sanity check the function param.
        // We'll know it's an Array if the length is greater than 1
        // Within the context of this app, there *will* be more than 1 category of images to display.
        if ((typeof cats === 'object') && (cats.length > 1)) {
            if (navElmt instanceof HTMLElement) {
                for (i = 0; i < cats.length; i++) {
                    var div = document.createElement('div');
                    var txt = document.createTextNode(cats[i]);
                    var aClass = document.createAttribute('class');
                    var aId = document.createAttribute('id');
                    var aCat = document.createAttribute('data-cat');

                    aClass.value = 'hva_cat-link';
                    aId.value = 'hva_' + cats[i];
                    aCat.value = cats[i];

                    div.setAttributeNode(aClass);
                    div.setAttributeNode(aId);
                    div.setAttributeNode(aCat);
                    div.appendChild(txt);

                    navElmt.appendChild(div);
                }

                // Click Event handler for the nav
                navElmt.addEventListener('click', onNavClick);
            
            } else {
                HamiltonvilleArt.Log.write({
                    obj: NAME,
                    fun: 'buildNav',
                    msg: 'ERROR. Missing <NAV> element.'
                });
            }
        }
    }

    // The user has clicked a Nav link.
    function onNavClick(evt) {
        var clickTarget, catName;

        // Get the Click-Target.
        if (evt.originalTarget && evt.originalTarget !== null) {
            clickTarget = evt.originalTarget;

        } else {
            clickTarget = evt.target;
        }

        // Get the Image Category Name from the clicked link.
        catName = clickTarget.getAttribute('data-cat');

        // Activate the clicked link.
        setActiveLink(catName);

        // Show the images associated with the selected category.
        HamiltonvilleArt.CatBuilder.showCatImages(catName);
    }

    // Programatically set the specified category link to be the active link.
    function setActiveLink(catName) {
        var navElmtList, linkElmt, i;

        if (typeof catName === 'string' && catName.length > 0) {
            navElmtList = navElmt.querySelectorAll('.hva_cat-link');

            // Cycle through the list of nav links & remove the "active" class from any that have it.
            for (i = 0; i < navElmtList.length; i++) {
                navElmtList[i].className = 'hva_cat-link';
            }

            // Grab the link to be set as "active"
            linkElmt = navElmt.querySelector('[data-cat="' + catName + '"]');

            // Set the clicked link as "active"
            linkElmt.className = 'hva_cat-link active';
        }
    }

    // Public API
    return {
        buildNav : buildNav,
        setActiveLink: setActiveLink
    };
})();