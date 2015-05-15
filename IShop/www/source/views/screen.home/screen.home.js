RAD.view("screen.home", RAD.Blanks.View.extend({

    url: 'source/views/screen.home/screen.home.html',

    onInitialize: function () {
        this.publish('service.dataSource.downloadShoppingCartData');
    },

    onStartAttach: function() {

    },

    events: {
        'tap .list-of-products': "listOfProducts",
        'tap .shopping-cart': "shoppingCart",
        'tap .shopping-history': "shoppingHistory",
        'tap .logout': "logout"
    },

    listOfProducts: function() {
        var options = {
            container_id: '#screen',
            content: "screen.listOfProducts",
            backstack: true
        };

        this.publish("navigation.show", options);
    },

    shoppingCart: function() {
        var options = {
            container_id: '#screen',
            content: "screen.shoppingCart",
            backstack: true
        };

        this.publish("navigation.show", options);
    },

    shoppingHistory: function() {
        var options = {
            container_id: '#screen',
            content: "screen.shoppingHistory",
            backstack: true
        };

        this.publish("navigation.show", options);
    },

    logout: function() {
        var options = {
            container_id: '#screen',
            content: "screen.login",
            backstack: true
        };

        this.publish("navigation.show", options);
    }

}));