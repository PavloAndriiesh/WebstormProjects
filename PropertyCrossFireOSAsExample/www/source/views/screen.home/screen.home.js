RAD.view("screen.home", RAD.Blanks.ScrollableView.extend({

    className: "screen scroll-view",

    url: 'source/views/screen.home/screen.home.html',

    onInitialize: function() {
        this.model = RAD.model('collection.searchedItems');
    },

    events: {
        'tap .screen-home-list-item': 'showDetails',
        'tap .back-button': 'onBackButton',
        'tap .show-more-button': 'searchMore',
        'tap .favorites-icon': "showFavorites"
    },

    showDetails: function (e) {
        var title = e.currentTarget.getAttribute('data-id');

        var options = {
            container_id: '#screen',
            content: 'screen.details',
            animation: 'slide',
            backstack: true,
            extras: {
                "title" : title,
                "model" : this.model,
                "fromHome" : true
            }
        };
        this.publish('navigation.show', options);
    },


    onBackButton: function() {
        var options = {
            container_id: '#screen',
            content: "screen.search"
        };

        this.publish('navigation.show', options);
    },

    searchMore: function () {
        this.publish('navigation.dialog.show', {content: 'screen.loader'});

        var that = this;
        var model = this.model;
        var options = {
            container_id: '#screen',
            content: "screen.home"
        };

        model.fetch({
            remove: false,
            dataType: "jsonp",
            data: {
                country: "uk",
                pretty: "1",
                action: "search_listings",
                encoding: "json",
                listing_type: "buy",
                place_name: model.word,
                page: ++model.page
            }
        }).then(function () {
            that.publish('navigation.dialog.close', {content: 'screen.loader'});
        });
    },

    showFavorites: function() {
        var options = {
            container_id: '#screen',
            content: "screen.favorites",
            backstack: true
        };

        this.publish('navigation.show', options);
    }

}));