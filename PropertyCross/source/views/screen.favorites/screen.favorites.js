RAD.view("screen.favorites", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.favorites/screen.favorites.html',

    onInitialize: function () {
        this.model = RAD.model('collection.favorites');
    },

    onStartAttach: function() {
        this.model.set(length, 0);
        this.model.push(this.loadFavorites());
    },

    events: {
        'tap .back-button' : 'back',
        'tap .screen-home-list-item': 'onItemClick'
    },

    back: function () {
        this.publish('router.back', null);
    },

    onItemClick: function (e) {
        var title = e.currentTarget.getAttribute('data-id');

        var options = {
            container_id: '#screen',
            content: 'screen.details',
            animation: 'slide',
            backstack: true,
            extras: {
                "title" : title,
                "model" : this.model
            }
        };
        this.publish('navigation.show', options);
    },


    //Local Storage

    supportsLocalStorage : function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },

    loadFavorites: function() {
        if (!this.supportsLocalStorage()) {
            return false;
        }

        try {
            JSON.parse(window.localStorage.getItem("favoritesCollection"));
        } catch (err) {
            saveSearchedWords([]);
            return;
        }


        return JSON.parse(window.localStorage.getItem("favoritesCollection"));
    }

}));