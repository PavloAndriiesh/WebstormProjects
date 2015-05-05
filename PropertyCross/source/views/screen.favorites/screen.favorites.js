RAD.view("screen.favorites", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.favorites/screen.favorites.html',

    onInitialize: function () {
        this.model = RAD.model('collection.favorites');
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
    }

}));