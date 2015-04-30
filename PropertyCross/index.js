(function (document, window) {
    // don't remove ## marks, CLI uses them for updating this file
    // #script_begin#
    
    var scripts = [
        
        "source/models/collection.favorites/collection.favorites.js",
        
        "source/models/collection.searchedItems/collection.searchedItems.js",
        
        "source/models/collection.searchedWords/collection.searchedWords.js",
        
        "source/models/model.itemDetail/model.itemDetail.js",
        
        "source/models/model.searchedCollection/model.searchedCollection.js",
        
        "source/service/service.json_loader/service.json_loader.js",
        
        "source/views/screen.details/screen.details.js",
        
        "source/views/screen.favorites/screen.favorites.js",
        
        "source/views/screen.home/screen.home.js",
        
        "source/views/screen.loader/screen.loader.js",
        
        "source/views/screen.search/screen.search.js",
        
        "source/application/application.js"
    ];
    // #script_end#
    function onEndLoad() {

        var core = window.RAD.core,
            application = window.RAD.application,
            coreOptions = {
                defaultBackstack: false,
                defaultAnimation: 'none',
                animationTimeout: 3000,
                debug: false
            };

        //initialize core by new application object
        core.initialize(application, coreOptions);

        //start
        application.start();
    }

    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));