RAD.view("screen.listOfProducts", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.listOfProducts/screen.listOfProducts.html',

    checkedCategories : [],

    onInitialize: function () {
        this.model = RAD.model('collection.listOfProducts');
    },

    events: {
        'tap .back-button': 'back',
        'tap .products-li' : 'productDetails',
        'tap .category-li' : 'changeCategory',
        'tap .scart-icon': "shoppingCart",
        'tap .flag' : "changeLanguage"
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
                "source" : "listOfProducts"
            }
        };

        this.publish("navigation.show", options);
    },

    changeCategory: function(event) {
        $(event.target).toggleClass("category-li-checked");

        var category = event.currentTarget.id;

        if(_.find(this.checkedCategories, function(cat){ return (cat === category); })) {
            this.checkedCategories = _.filter(this.checkedCategories, function(cat){ return (cat !== category); });
        } else {
            this.checkedCategories.push(category);
        }
        this.loadItems();
    },

    loadItems: function() {
        var categoriesToLoad = this.checkedCategories;
        this.publish("service.dataSource.loadItems", categoriesToLoad);
    },


    shoppingCart: function() {
        var options = {
            content: "screen.shoppingCart",
            backstack: true
        };

        this.publish("navigation.show", options);
    },

    changeLanguage: function(event) {
        var newLanguage = event.currentTarget.id;
        this.publish('service.dataSource.setLanguage', newLanguage);
    }

}));