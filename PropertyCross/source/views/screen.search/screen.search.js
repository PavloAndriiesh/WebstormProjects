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

    showFavorites: function() {
        var options = {
            container_id: '#screen',
            content: "screen.favorites",
            backstack: true
        };

        this.publish('navigation.show', options);
    },

    searchWord: function(e) {
        var word = e.currentTarget.getAttribute('data-word');
        if (!word) return;

        document.getElementById("text").value = word;
        this.search();
    },

    search: function () {
        var self = this;

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

            var searchedWords = self.loadSearchedWords();
            if (!searchedWords) searchedWords = [];
            if (searchedWords.length >= 20) {
                searchedWords.pop();
            }

            searchedWords.unshift({ "word": word, "resultItems": RAD.model('collection.searchedItems').total_pages*20});
            self.model.unshift({ "word": word, "resultItems": RAD.model('collection.searchedItems').total_pages*20});
            self.saveSearchedWords(searchedWords);

            self.publish('navigation.show', options);
        });
    },

    loadObjectsFromLocalStorage: function() {
        this.model.push(this.loadSearchedWords());
    },

    // LocalStorage

    loadSearchedWords : function () {
        if (!this.supportsLocalStorage()) {
            return false;
        }

        try {
            JSON.parse(window.localStorage.getItem("searchedItemsCollection"));
        } catch (err) {
            saveSearchedWords([]);
            return;
        }


        return JSON.parse(window.localStorage.getItem("searchedItemsCollection"));
    },

    saveSearchedWords : function (collection) {
        if (!this.supportsLocalStorage()) {
            return false;
        }
        window.localStorage.setItem("searchedItemsCollection", JSON.stringify(collection));
    },

    supportsLocalStorage : function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

}));