RAD.view("screen.details", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.details/screen.details.html',

    className: "screen scroll-view",

    onInitialize: function () {
        this.model  = RAD.model('model.itemDetail');
    },

    onNewExtras: function (thisTitle) {
        this.model.set(thisTitle.model.findWhere({title:(thisTitle.title)}).toJSON())
    },

    onStartRender: function () {
    },

    onStartAttach: function() {
        var that = this;
        var localStoredItems = this.loadFavorites();

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
        'tap .addFavorites': 'saveToFavorites',
        'tap .removeFavorites': 'removeFromFavorites'

    },

    showFavorites: function() {
        var options = {
            container_id: '#screen',
            content: "screen.favorites",
            backstack: true
        };

        this.publish('navigation.show', options);
    },

    saveToFavorites: function() {
        RAD.model('collection.favorites').unshift(this.model);
        this.saveFavorites(RAD.model('collection.favorites'));
        this.showFavorites();
    },

    removeFromFavorites: function() {
        //RAD.model('collection.favorites').unshift(this.model);
        //this.saveFavorites(RAD.model('collection.favorites'));
        console.log("inside removeFromFavorites");

        var array = this.loadFavorites();
        var index = -1;
        console.log(array);

        for(var i=0; i<array.length; i++) {
            console.log(array[i]);
            if (array[i].title === this.extras.title) {
                index = i;
            }
        }

        if (index > -1) {
            array.splice(index, 1);
        }

        RAD.model('collection.favorites').shift();

        this.saveFavorites(array);
        this.routerBack();
    },

    routerBack: function (e) {
        this.publish('router.back', null);
    },

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