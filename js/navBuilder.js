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

                    aClass.value = 'hva_cat-link';
                    aId.value = 'hva_' + cats[i];

                    div.setAttributeNode(aClass);
                    div.setAttributeNode(aId);
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
        console.dir(evt);

        // Cycle through the list of nav links & remove the "active" class from any that have it.
        var i, clickTarget;
        var navElmtList = navElmt.querySelectorAll('.hva_cat-link');

        for (i = 0; i < navElmtList.length; i++) {
            navElmtList[i].className = 'hva_cat-link';
        }

        // Set the clicked link as "active"
        if (evt.originalTarget && evt.originalTarget !== null) {
            clickTarget = evt.originalTarget;
        
        } else {
            clickTarget = evt.target;
        }

        clickTarget.className = 'hva_cat-link active';

        // Tell the Category Builder to show the selected set of images.
        
    }

    // Public API
    return {
        buildNav : buildNav
    };
})();