RAD.view("screen.shoppingCart", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.shoppingCart/screen.shoppingCart.html',

    onInitialize: function () {
        this.model = RAD.model('collection.shoppingCart');
    },

    onStartRender: function() {
        this.calculatePrice();
    },

    events: {
        'tap .make-order' :'makeOrder',
        'tap .remove-item' : 'removeItem',
        'tap .products-li' : 'productDetails',
        'tap .flag' : "changeLanguage",
        'tap .back-button': 'back'
    },

    calculatePrice: function() {
        var price = 0;
        var quantity = 0;

        _.each(this.model.models, function (item) {
            price += item.get("price")*item.get("inShoppingCart");
            quantity += item.get("inShoppingCart");
        });

        var discount = window.user.isVip? (price*3/100).toFixed(0) : 0;

        var deal;
        var percentDeal;

        if(quantity<11) {
            deal = price*5/100;
            percentDeal = 5;
        } else if (quantity<21) {
            deal = price*10/100;
            percentDeal = 10;
        } else {
            deal = price*15/100;
            percentDeal = 15;
        }

        var total = price - discount - deal;

        this.model.price = price;
        this.model.discount = discount;
        this.model.deal = deal;
        this.model.percentDeal = percentDeal;
        this.model.total = total;
    },

    makeOrder: function() {
        if (this.model.total === 0) {
            return;
        }

        var order = {
            date : new Date().toLocaleDateString(),
            total: this.model.total
        };

        RAD.model("collection.shoppingHistory").push(order);
        this.publish('service.dataSource.saveShoppingHistory');
        RAD.model("collection.shoppingCart").reset();
        this.publish('service.dataSource.saveShoppingCartData');
        this.showAffirmationPopup("order");
    },

    showAffirmationPopup: function(action, quantity) {
        var that = this;
        var popupDelay = 1000;

        var options = {
            container_id: '#screen',
            content: "screen.affirmationPopup",
            extras: {
                action: action,
                quantity: quantity
            }
        };

        this.publish('navigation.dialog.show', options);

        window.setTimeout(function() {
            that.publish('navigation.dialog.close', options);
        }, popupDelay);
    },

    removeItem: function(event) {
        var id = event.currentTarget.getAttribute('data-id');

        var shopingCartItems = _.filter(RAD.model("collection.shoppingCart").models, function(item) {
            return item.attributes.id !== +id;
        });

        RAD.model("collection.shoppingCart").reset();
        RAD.model("collection.shoppingCart").push(shopingCartItems);

        this.publish('service.dataSource.saveShoppingCartData');
    },

    productDetails: function(event) {
        var id = event.currentTarget.getAttribute('data-id');

        var options = {
            container_id: '#screen',
            content: "screen.productDetails",
            backstack: true,
            extras: {
                "id" : id,
                "source" : "shoppingCart"
            }
        };

        this.publish("navigation.show", options);
    },

    changeLanguage: function(event) {
        var newLanguage = event.currentTarget.id;
        this.publish('service.dataSource.setLanguage', newLanguage);
    },

    back: function () {
        this.publish('router.back', null);
    }

}));