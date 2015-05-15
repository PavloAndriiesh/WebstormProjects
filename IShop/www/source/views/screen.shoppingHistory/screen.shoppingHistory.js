RAD.view("screen.shoppingHistory", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.shoppingHistory/screen.shoppingHistory.html',

    onInitialize: function () {
        this.model = RAD.model("collection.shoppingHistory");
        this.publish('service.dataSource.loadShoppingHistory');
    },

    events: {
        'tap .back-button': 'back'
    },

    back: function () {
        this.publish('router.back', null);
    }

}));