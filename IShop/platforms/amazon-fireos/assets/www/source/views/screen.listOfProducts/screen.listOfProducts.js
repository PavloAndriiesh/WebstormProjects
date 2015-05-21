RAD.view("screen.listOfProducts", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.listOfProducts/screen.listOfProducts.html',

    checkedCategories : [],

    onInitialize: function () {
        this.model = RAD.model('collection.listOfProducts');
        RAD.models.collection.listOfProducts.isCategoriesShown = true;
    },

    events: {
        'tap .back-button': 'back',
        'tap .products-li' : 'productDetails',
        'tap .category-li' : 'changeCategory',
        'tap .scart-icon': "shoppingCart",
        'tap .flag' : "changeLanguage",
        'tap .hide-show-categories': "changeCategoriesVisibility"
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
        this.showLoader();
        $(event.target).toggleClass("category-li-checked");

        var category = event.currentTarget.id;

        if(_.find(this.checkedCategories, function(cat){ return (cat === category); })) {
            this.checkedCategories = _.filter(this.checkedCategories, function(cat){ return (cat !== category); });
        } else {
            this.checkedCategories.push(category);
        }

        this.loadItems(category);
    },

    loadItems: function(category) {
        this.publish("service.dataSource.loadItems", category);
    },

    onEndRender: function () {
        this.loadImages();
    },

    loadImages: function() {
        _.each($('.products-li-img'), function ($img) {
            if (!$img.complete) {
                $img.onload = function () {
                    RAD.model('collection.listOfProducts').trigger("change");
                };
            }
        });
    },

    shoppingCart: function() {
        var options = {
            container_id: '#screen',
            content: "screen.shoppingCart",
            backstack: true
        };

        this.publish("navigation.show", options);
    },

    changeLanguage: function(event) {
        var newLanguage = event.currentTarget.id;
        this.publish('service.dataSource.setLanguage', newLanguage);
    },

    changeCategoriesVisibility: function() {
        RAD.models.collection.listOfProducts.isCategoriesShown = !RAD.models.collection.listOfProducts.isCategoriesShown;
        RAD.model('collection.listOfProducts').trigger("change");
    },

    showLoader: function() {
        var options = {
            container_id: '#screen',
            content: "screen.affirmationPopup",
            extras: {
                action: "Loading"
            }
        };

        this.publish('navigation.dialog.show', options);
    },

    hideLoader: function() {
        var options = {
            container_id: '#screen',
            content: "screen.affirmationPopup",
            extras: {
                action: "Loading"
            }
        };

        this.publish('navigation.dialog.close', options);
    }

}));