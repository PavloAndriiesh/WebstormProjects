RAD.view("screen.details", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.details/screen.details.html',

    className: "screen scroll-view",

    onInitialize: function () {
        this.model = RAD.model('model.itemDetail');
        this.model.set("isFavorites", false);
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
        'tap .removeFavorites': 'changeFavorites'
    },

    _refreshButtons: function () {
        var localStoredItems = JSON.parse(JSON.stringify(RAD.model('collection.favorites')));

        if (localStoredItems === null) return;
        for (var i = 0; i < localStoredItems.length; i++) {
            if (localStoredItems[i].title === this.extras.title) {
                this.model.set("isFavorites", true);
                return;
            }
        }

        this.model.set("isFavorites", false);
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

    changeFavorites: function() {
        if (this.model.get("isFavorites")) {
            this.removeFromFavorites();
        } else {
            this.addToFavorites();
        }

    },

    addToFavorites: function () {
        var that = this;
        RAD.model('collection.favorites').unshift(this.model);
        that.publish('service.localStorage.saveFavorites', {
            onSuccess: function () {
                console.log("Adding to favorites: success");
                that.publish('service.localStorage.loadFavorites', {});
                that.model.set("isFavorites", true);
            },
            onError: function (error) {
                console.log("Error!!!: " + error)
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

        that.publish('service.localStorage.saveFavorites', {
            onSuccess: function () {
                console.log("Removing from favorites: success");
                that.publish('service.localStorage.loadFavorites', {});
                that.model.set("isFavorites", false);
            },
            onError: function (error) {
                console.log("Error: " + error)
            }
        });
    }
}));
