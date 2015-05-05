(function (document, window) {
    // don't remove ## marks, CLI uses them for updating this file
    // #script_begin#
    
    var scripts = [
        
        "source/views/screen.home/screen.home.js",
        "source/views/screen.details/screen.details.js",
        "source/views/screen.loader/screen.loader.js",

        "source/models/collection.phones/collection.phones.js",
        "source/models/model.itemDetail/model.itemDetail.js",
        
        "source/service/service.json_loader/service.json_loader.js",
        
        "source/application/application.js"
    ];
    // #script_end#
    function onEndLoad() {

        var core = window.RAD.core,
            application = window.RAD.application,
            coreOptions = {
                defaultBackstack: true,
                defaultAnimation: 'slide',
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