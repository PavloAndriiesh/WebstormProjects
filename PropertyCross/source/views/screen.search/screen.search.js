RAD.view("screen.search", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.search/screen.search.html',

    className: "screen scroll-view",

    onInitialize: function () {
        this.model = RAD.model('collection.searchedWords');
        this.loadObjectsFromLocalStorage();
    },

    events: {
        'tap #search-button': 'search',
        'tap .prev-search': 'searchWord',
        'tap .favorites-icon': 'showFavorites'
    },

    showFavorites: function () {
        var options = {
            container_id: '#screen',
            content: "screen.favorites",
            backstack: true
        };

        this.publish('navigation.show', options);
    },

    searchWord: function (e) {
        var word = e.currentTarget.getAttribute('data-word');
        if (!word) return;

        document.getElementById("text").value = word;
        this.search();
    },

    search: function () {
        this.publish('navigation.dialog.show', {content: 'screen.loader'});

        var that = this;

        var word = document.getElementById("text").value;
        if (!word) return;

        RAD.model('collection.searchedItems').word = word;
        RAD.model('collection.searchedItems').page = 0;

        var options = {
            container_id: '#screen',
            content: "screen.home",
            backstack: true
        };

        RAD.model('collection.searchedItems').fetch({
            dataType: "jsonp",
            data: {
                country: "uk",
                pretty: "1",
                action: "search_listings",
                encoding: "json",
                listing_type: "buy",
                place_name: word,
                page: ++RAD.model('collection.searchedItems').page
            }
        }).then(function () {
            that.publish('service.localStorage.saveSearchedWords', {});
            that.publish('navigation.show', options);
            that.publish('navigation.dialog.close', {content: 'screen.loader'});
        });
    },

    loadObjectsFromLocalStorage: function () {
        this.publish('service.localStorage.loadSearchedWords', {});
        this.publish('service.localStorage.loadFavorites', {});
    }

}));