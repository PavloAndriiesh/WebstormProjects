RAD.view("screen.home", RAD.Blanks.ScrollableView.extend({

    className: "screen scroll-view",

    url: 'source/views/screen.home/screen.home.html',

    onInitialize: function() {
        this.model = RAD.model('collection.searchedItems');
    },

    events: {
        'tap .screen-home-list-item': 'showDetails',
        'tap .back-button': 'onBackButton',
        'tap .show-more-button': 'searchMore',
        'tap .favorites-icon': "showFavorites"
    },

    showDetails: function (e) {
        var title = e.currentTarget.getAttribute('data-id');

        var options = {
            container_id: '#screen',
            content: 'screen.details',
            animation: 'slide',
            backstack: true,
            extras: {
                "title" : title,
                "model" : this.model,
                "fromHome" : true
            }
        };
        this.publish('navigation.show', options);
    },


    onBackButton: function() {
        var options = {
            container_id: '#screen',
            content: "screen.search"
        };

        this.publish('navigation.show', options);
    },

    searchMore: function () {
        var model = this.model;
        var options = {
            container_id: '#screen',
            content: "screen.home"
        };

        model.fetch({
            dataType: "jsonp",
            data: {
                country: "uk",
                pretty: "1",
                action: "search_listings",
                encoding: "json",
                listing_type: "buy",
                place_name: model.word,
                page: ++model.page,
                reset: true
            }
        }).then(function () {

        });
    },

    showFavorites: function() {
        var options = {
            container_id: '#screen',
            content: "screen.favorites",
            backstack: true
        };

        this.publish('navigation.show', options);
    },


    // LocalStorage

    loadSearchedWords : function () {
        try {
            JSON.parse(window.localStorage.getItem("searchedItemsCollection"));
        } catch (err) {
            return;
        }

        if (!this.supportsLocalStorage()) {
            return false;
        }
        return JSON.parse(window.localStorage.getItem("searchedItemsCollection"));
    },

    supportsLocalStorage : function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },

    saveSearchedWords : function (collection) {
        if (!this.supportsLocalStorage()) {
            return false;
        }
        window.localStorage.setItem("searchedItemsCollection", JSON.stringify(collection));
    }

}));