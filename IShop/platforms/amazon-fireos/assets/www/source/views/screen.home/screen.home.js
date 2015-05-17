RAD.view("screen.home", RAD.Blanks.View.extend({

    url: 'source/views/screen.home/screen.home.html',

    onInitialize: function () {
        this.model = RAD.model("model.home");
        this.publish('service.dataSource.loadShoppingCartData');
        this.publish('service.dataSource.loadShoppingHistory');
    },

    events: {
        'tap .list-of-products': "listOfProducts",
        'tap .shopping-cart': "shoppingCart",
        'tap .scart-icon': "shoppingCart",
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
            content: "screen.confirmLogout"
        };

        this.publish('navigation.dialog.show', options);

    },

    changeLanguage: function(event) {
        var newLanguage = event.currentTarget.id;
        this.publish('service.dataSource.setLanguage', newLanguage);
    }

}));