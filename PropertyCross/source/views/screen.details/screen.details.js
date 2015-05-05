RAD.view("screen.details", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.details/screen.details.html',

    className: "screen scroll-view",

    onInitialize: function () {
        this.model = RAD.model('model.itemDetail');
    },

    onNewExtras: function (thisTitle) {
        this.model.set(thisTitle.model.findWhere({title: (thisTitle.title)}).toJSON())
    },

    onStartAttach: function () {
        this._refreshButtons();
    },

    events: {
        'tap .back-to-list': 'routerBack',
        'tap .favorites-icon': 'showFavorites',
        'tap .addFavorites': 'addToFavorites',
        'tap .removeFavorites': 'removeFromFavorites'
    },

    _refreshButtons: function () {
        var localStoredItems = JSON.parse(JSON.stringify(RAD.model('collection.favorites')));

        if (localStoredItems === null) return;
        for (var i = 0; i < localStoredItems.length; i++) {
            if (localStoredItems[i].title === this.extras.title) {
                document.getElementById("addFavorites").className = "addFavorites btn btn-default display-none";
                document.getElementById("removeFavorites").className = "removeFavorites btn btn-default";
                return;
            }
        }
        document.getElementById("addFavorites").className = "addFavorites btn btn-default";
        document.getElementById("removeFavorites").className = "removeFavorites btn btn-default display-none";
    },

    routerBack: function (e) {
        this.publish('router.back', null);
    },

    showFavorites: function () {
        var options = {
            container_id: '#screen',
            content: "screen.favorites",
            backstack: true
        };

        this.publish('navigation.show', options);
    },

    addToFavorites: function () {
        var that = this;
        RAD.model('collection.favorites').unshift(this.model);
        this.publish('service.localStorage.saveFavorites', {
            onSuccess: function () {
                console.log("Success!!!");
                that.publish('service.localStorage.loadFavorites', {});
                that._refreshButtons();
            },
            onError: function () {
                console.log("Error!!!")
            }
        });
    },

    removeFromFavorites: function () {
        var that = this;
        var favorites = JSON.parse(JSON.stringify(RAD.model('collection.favorites')));
        var newFavorites = _.filter(favorites, function (prop) {
            return prop.title !== that.extras.title
        });
        RAD.model('collection.favorites').reset();
        RAD.model('collection.favorites').push(newFavorites);
        this.publish('service.localStorage.saveFavorites', {
            onSuccess: function () {
                console.log("Success!!!");
                that.publish('service.localStorage.loadFavorites', {});
                that._refreshButtons();
            },
            onError: function () {
                console.log("Error!!!")
            }
        });
    }
}));
