RAD.view("screen.shoppingHistory", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.shoppingHistory/screen.shoppingHistory.html',

    onInitialize: function () {
        this.model = RAD.model("collection.shoppingHistory");
    },

    events: {
        'tap .back-button': 'back',
        'tap .flag' : "changeLanguage"
    },

    back: function () {
        this.publish('router.back', null);
    },

    changeLanguage: function(event) {
        var newLanguage = event.currentTarget.id;
        this.publish('service.dataSource.setLanguage', newLanguage);
    }

}));