RAD.application(function (core) {
    var app = this;

    app.currentFile = 0;

    app.start = function () {
        core.startService();
        app.loadList(true);
    };

    app.loadList = function(fisrtStart) {

        app.currentFile++;

        var options = {
            container_id: '#screen',
            content: "screen.home",
            animation: 'none',
            backstack: true
        };

        core.publish('service.json_loader.get',
            {
                file: "jsondata/phones" + app.currentFile + ".json",

                loader: true,
                callback: function (json) {
                    RAD.model('collection.phones').add(json);

            }
        });
        core.publish('navigation.show', options);
    };

    app.showDetails = function (id) {
        var options = {
            container_id: '#screen',
            content: 'screen.details',
            backstack: true,
            extras: id
        };
        core.publish('navigation.show', options);
    };

    return app;
}, true);
