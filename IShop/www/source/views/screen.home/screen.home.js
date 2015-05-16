RAD.view("screen.home", RAD.Blanks.View.extend({

    url: 'source/views/screen.home/screen.home.html',

    onInitialize: function () {
        this.model = RAD.model("model.home");
        this.publish('service.dataSource.downloadShoppingCartData');
        this.publish('service.dataSource.loadShoppingHistory');
    },

    onStartAttach: function() {

    },

    events: {
        'tap .list-of-products': "listOfProducts",
        'tap .shopping-cart': "shoppingCart",
        'tap .shopping-history': "shoppingHistory",
        'tap .logout': "logout",
        'tap .flag': "changeLanguage"
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
            backstack: false
        };

        this.publish("navigation.show", options);
    },

    changeLanguage: function(event) {
        var newLanguage = event.currentTarget.id;
        this.publish('service.dataSource.setLanguage', newLanguage);
    }

}));