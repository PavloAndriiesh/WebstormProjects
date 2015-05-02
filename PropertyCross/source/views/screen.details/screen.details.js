RAD.view("screen.details", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.details/screen.details.html',

    className: "screen scroll-view",

    onInitialize: function () {
        this.model  = RAD.model('model.itemDetail');
    },

    onNewExtras: function (thisTitle) {
        this.model.set(thisTitle.model.findWhere({title:(thisTitle.title)}).toJSON())
    },

    onStartAttach: function() {
        var that = this;
        var localStoredItems = this.loadFavorites();

        if (localStoredItems === null) return;
        for (var i=0; i<localStoredItems.length; i++) {
            if (localStoredItems[i].title === this.extras.title) {
                document.getElementById("addFavorites").className = "addFavorites btn btn-default display-none";
                document.getElementById("removeFavorites").className = "removeFavorites btn btn-default";
                return;
            }
        }
        document.getElementById("addFavorites").className = "addFavorites btn btn-default";
        document.getElementById("removeFavorites").className = "removeFavorites btn btn-default display-none";
    },

    events: {
        'tap .back-to-list' : 'routerBack',
        'tap .favorites-icon': 'showFavorites',
        'tap .addFavorites': 'addToFavorites',
        'tap .removeFavorites': 'removeFromFavorites'

    },

    routerBack: function (e) {
        this.publish('router.back', null);
    },

    showFavorites: function() {
        var options = {
            container_id: '#screen',
            content: "screen.favorites",
            backstack: true
        };

        this.publish('navigation.show', options);
    },

    addToFavorites: function() {
        var favorites = this.loadFavorites();
        if (!favorites) favorites = [];
        favorites.unshift(this.model);
        this.saveFavorites(favorites);
        this.onStartAttach();
    },

    removeFromFavorites: function() {
        var that = this;

        var favorites = this.loadFavorites();
        var newFavorites = _.filter(favorites, function(prop) {return prop.title !== that.extras.title} );
        this.saveFavorites(newFavorites);
        this.onStartAttach();
    },


    // Local Storage

    loadFavorites: function() {
        if (!this.supportsLocalStorage()) {
            return false;
        }

        try {
            JSON.parse(window.localStorage.getItem("favoritesCollection"));
        } catch (err) {
            return;
        }

        return JSON.parse(window.localStorage.getItem("favoritesCollection"));
    },

    saveFavorites : function (collection) {
        if (!this.supportsLocalStorage()) {
            return false;
        }
        window.localStorage.setItem("favoritesCollection", JSON.stringify(collection));
    },

    supportsLocalStorage : function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }
}));