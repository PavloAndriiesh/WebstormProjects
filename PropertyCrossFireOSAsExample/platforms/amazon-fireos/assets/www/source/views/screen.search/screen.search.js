RAD.view("screen.search", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.search/screen.search.html',

    onInitialize: function () {
        this.model = RAD.model('collection.searchedWords');
        this.loadObjectsFromLocalStorage();
        this.showInfo();
    },

    events: {
        'tap .search': 'search',
        'tap .prev-search': 'searchWord',
        'tap .favorites-icon': 'showFavorites',
        'tap .info-button' : "showInfo"
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
        this.search({}, true);
    },

    search: function (obj, isUsedWord) {
        var word = document.getElementById("text").value;
        if (!word) {
            return;
        }

        var that = this;

        this.publish('navigation.dialog.show', {content: 'screen.loader'});


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
            if (!isUsedWord) {
                that.publish('service.localStorage.saveSearchedWords', {});
            }

            that.publish('navigation.show', options);
            that.publish('navigation.dialog.close', {content: 'screen.loader'});
        });
    },

    loadObjectsFromLocalStorage: function () {
        this.publish('service.localStorage.loadSearchedWords', {});
        this.publish('service.localStorage.loadFavorites', {});
    },

    showInfo: function() {
        this.publish('navigation.dialog.show', {content: 'screen.info'});
    }

}));