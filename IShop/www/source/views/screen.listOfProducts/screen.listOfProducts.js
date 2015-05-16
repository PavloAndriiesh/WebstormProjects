RAD.view("screen.listOfProducts", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.listOfProducts/screen.listOfProducts.html',

    checkedCategories : [],

    onInitialize: function () {
        this.model = RAD.model('collection.listOfProducts');
    },

    onStartAttach: function() {

    },

    events: {
        'tap .back-button': 'back',
        'tap .products-li' : 'productDetails',
        'tap .category-li' : 'changeCategory',
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
        console.log(category);

        if(_.find(this.checkedCategories, function(cat){ return (cat === category); })) {
            this.checkedCategories = _.filter(this.checkedCategories, function(cat){ return (cat !== category); });
        } else {
            this.checkedCategories.push(category);
        }
        this.refreshModel();
    },

    refreshModel: function() {

        var that = this;
        that.publish("service.dataSource.refreshGoods", that.checkedCategories);

    },

    changeLanguage: function(event) {
        var newLanguage = event.currentTarget.id;
        this.publish('service.dataSource.setLanguage', newLanguage);
    }

}));