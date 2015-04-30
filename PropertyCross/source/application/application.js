RAD.application(function (core) {
    var app = this;

    app.currentFile = 0;

    app.start = function () {
        core.startService();
        app.searchPage(true);
    };

    app.searchPage = function(id) {

        var options = {
            container_id: '#screen',
            content: 'screen.search',
            backstack: true,
            extras: id
        };


        core.publish('navigation.show', options);
    };

    return app;
}, true);
