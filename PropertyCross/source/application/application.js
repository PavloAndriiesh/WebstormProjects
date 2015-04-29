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


    app.sendRequest = function(word) {
        console.log("sent request with name/postcode" + word);
    };

    app.showDetails = function (id) {
        var options = {
            container_id: '#screen',
            content: 'screen.details',
            animation: 'slide',
            backstack: true,
            extras: id
        };
        core.publish('navigation.show', options);
    };


    // LocalStorage

    app.saveSearchedWords = function (collection) {
        if (!app.supportsLocalStorage()) {
            return false;
        }
        window.localStorage.setItem("searchedItemsCollection", JSON.stringify(collection));
    };

    app.loadSearchedWords = function () {
        try {
            JSON.parse(window.localStorage.getItem("searchedItemsCollection"));
        } catch (err) {
            return;
        }

        if (!app.supportsLocalStorage()) {
            return false;
        }
        return JSON.parse(window.localStorage.getItem("searchedItemsCollection"));
    };

    app.supportsLocalStorage = function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

    return app;
}, true);
