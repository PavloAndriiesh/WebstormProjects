RAD.application(function (core) {
    var app = this;

    app.currentFile = 0;

    app.start = function () {
        core.startService();
        app.loadList(true);
    };

    app.loadList = function (firstStart) {
        app.currentFile++;
        var options = {
            container_id: '#screen',
            content: 'screen.home',
            animation: "slide",
            backstack: true
        };

        core.publish('service.json_loader.get',
            {
                file: "jsondata/phones"+ app.currentFile +".json",

                loader:true,

                callback: function (json) {
                    RAD.model('collection.phones').add(json, {silent:true});
                    if (firstStart) {
                        core.publish('navigation.show', options);
                    }
                    RAD.model('collection.phones').trigger('change');
                }
            });
    }

    app.showDetails = function (id) {
        var options = {
            container_id: '#screen',
            content: 'screen.details',
            backstack: true,
            extras: id
        };
        core.publish('navigation.show', options);
    }

    return app;
}, true);
