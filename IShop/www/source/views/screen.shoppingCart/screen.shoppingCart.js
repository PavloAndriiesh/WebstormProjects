RAD.view("screen.shoppingCart", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.shoppingCart/screen.shoppingCart.html',

    events: {
        'tap .back-button': 'back',
        'tap .products-li' : 'productDetails'
    },

    back: function () {
        this.publish('router.back', null);
    },

    productDetails: function() {

        var options = {
            container_id: '#screen',
            content: "screen.productDetails",
            backstack: true
        };

        this.publish("navigation.show", options);
    }

}));