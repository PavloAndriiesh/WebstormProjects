RAD.service("service.localStorage", RAD.Blanks.Service.extend({

    isSaving: false,

    onReceiveMsg: function (channel, data) {

        var parts = channel.split('.'),
            command = parts[parts.length - 1];

        switch (command) {
            case 'loadUser':
                this.loadUser(data);
                break;

            case "saveUser":
                this.saveUser(data);
                break;

            case "loadFavorites":
                this.loadFavorites(data);
                break;

            case "saveFavorites":
                this.saveFavorites(data);
                break;
        }
    },

    loadUser: function () {
        if (!this.isLocalStorageSupported()) {
            return false;
        }

        try {
            JSON.parse(window.localStorage.getItem("user"));
        } catch (err) {
            this.saveUser();
            return;
        }

        window.user = JSON.parse(window.localStorage.getItem("user"));
    },

    saveUser: function (data) {
        if (!this.isLocalStorageSupported()) {
            return false;
        }

        window.localStorage.setItem("user", JSON.stringify(data));
    },

    loadFavorites: function () {

        if (this.isSaving) return;

        if (!this.isLocalStorageSupported()) {
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

        if (!that.isLocalStorageSupported()) {
            return false;
        }

        that.isSaving = false;

        try {
            window.localStorage.setItem("favoritesCollection", JSON.stringify(RAD.model('collection.favorites')));
            data.onSuccess();
        } catch(err) {
            data.onError(err);
        }
    },

    isLocalStorageSupported: function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }
}));