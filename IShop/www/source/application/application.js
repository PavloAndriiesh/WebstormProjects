RAD.application(function (core) {
    var app = this;

    app.start = function () {
        core.startService();
        app.searchPage(true);
    };

    app.searchPage = function(id) {

        var options = {
            container_id: '#screen',
            content: 'screen.login',
            backstack: true
        };

        core.publish('navigation.show', options);
    };

    return app;
}, true);
