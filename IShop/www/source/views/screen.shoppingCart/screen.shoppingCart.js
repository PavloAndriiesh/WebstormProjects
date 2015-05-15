RAD.view("screen.shoppingCart", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.shoppingCart/screen.shoppingCart.html',

    onInitialize: function () {
        this.model = RAD.model('collection.shoppingCart');
        this.calculatePrice();
    },

    onStartRender: function() {
        this.calculatePrice();
    },

    events: {
        'tap .back-button': 'back',
        'tap .products-li' : 'productDetails',
        'tap .make-order' :'makeOrder'
    },

    back: function () {
        this.publish('router.back', null);
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

    calculatePrice: function() {
        var price = 0;
        var quantity = 0;

        _.each(this.model.models, function (item) {
            price += item.get("price")*item.get("inShoppingCart");
            quantity += item.get("inShoppingCart");
        });

        var discount = window.user.isVip? (price*3/100).toFixed(0) : 0;

        var deal = 0;
        var percentDeal = 0;

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
        console.log(this.model);

        var order = {
            date : new Date().toLocaleDateString(),
            total: this.model.total
        };

        RAD.model("collection.shoppingHistory").push(order);
        this.publish('service.dataSource.saveShoppingHistory');
        RAD.model("collection.shoppingCart").reset();
        this.publish('service.dataSource.uploadShoppingCartData');

    }

}));