RAD.service("service.localStorage", RAD.Blanks.Service.extend({

    isSaving: false,

    onReceiveMsg: function (channel, data) {

        var parts = channel.split('.'),
            command = parts[parts.length - 1];

        switch (command) {
            case 'loadSearchedWords':
                this.loadSearchedWords(data);
                break;

            case "saveSearchedWords":
                this.saveSearchedWords(data);
                break;

            case "loadFavorites":
                this.loadFavorites(data);
                break;

            case "saveFavorites":
                this.saveFavorites(data);
                break;
        }
    },

    loadSearchedWords: function () {
        if (!RAD.util.isLocalStorageSupported()) {
            return false;
        }

        try {
            JSON.parse(window.localStorage.getItem("searchedItemsCollection"));
        } catch (err) {
            this.saveSearchedWords();
            return;
        }

        RAD.model('collection.searchedWords').push(JSON.parse(window.localStorage.getItem("searchedItemsCollection")));
    },

    saveSearchedWords: function () {
        if (!RAD.util.isLocalStorageSupported()) {
            return false;
        }

        var searchedWords = JSON.parse(JSON.stringify(RAD.model('collection.searchedWords')));
        if (!searchedWords) {
            searchedWords = [];
        }
        if (searchedWords.length >= 20) {
            searchedWords.pop();
        }

        var wordsModel = RAD.model('collection.searchedWords');
        var itemsModel = RAD.model('collection.searchedItems');

        if (!itemsModel.total_pages) return;

        searchedWords.unshift({
            "word": itemsModel.word,
            "resultItems": itemsModel.total_pages * 20
        });
        wordsModel.unshift({"word": itemsModel.word, "resultItems": itemsModel.total_pages * 20});
        window.localStorage.setItem("searchedItemsCollection", JSON.stringify(searchedWords));

    },

    loadFavorites: function () {

        if (this.isSaving) return;

        if (!RAD.util.isLocalStorageSupported()) {
            return false;
        }

        try {
            JSON.parse(window.localStorage.getItem("favoritesCollection"));
        } catch (err) {
            this.saveFavorites(err);
            return;
        }
        RAD.model('collection.favorites').reset();
        RAD.model('collection.favorites').push(JSON.parse(window.localStorage.getItem("favoritesCollection")));
    },

    saveFavorites: function (data) {

        if (this.isSaving) {
            return;
        }

        var that = this;

        that.isSaving = true;

        if (!RAD.util.isLocalStorageSupported()) {
            return false;
        }

        that.isSaving = false;

        try {
            window.localStorage.setItem("favoritesCollection", JSON.stringify(RAD.model('collection.favorites')));
            data.onSuccess();
        } catch(err) {
            data.onError(err);
        }
    }
}));