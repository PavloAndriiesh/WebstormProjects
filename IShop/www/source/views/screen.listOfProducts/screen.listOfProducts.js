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
        'tap .flag' : "changeLanguage",
        'tap .select-category-button': "changeCategoriesVisibility"
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
        var that = this;

        try {
            $(event.target).toggleClass("category-li-checked");

            var category = event.currentTarget.id;

            if(_.find(this.checkedCategories, function(cat){ return (cat === category); })) {
                this.checkedCategories = _.filter(this.checkedCategories, function(cat){ return (cat !== category); });
            } else {
                this.showLoader();
                this.checkedCategories.push(category);
            }
            this.loadItems();
        } catch (err) {
            console.log(err);
        }

        window.setTimeout(function() {
            that.hideLoader();
        }, 100);
    },

    loadItems: function() {
        var categoriesToLoad = this.checkedCategories;
        this.publish("service.dataSource.loadItems", categoriesToLoad);
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
        $(".category-ul-wrapper").toggleClass("hidden");
        $(".products-ul-wrapper").toggleClass("col-xs-7").toggleClass("col-sm-7").toggleClass("col-md-7").toggleClass("col-lg-7").
            toggleClass("col-xs-12").toggleClass("col-sm-12").toggleClass("col-md-12").toggleClass("col-lg-12");

    },

    showLoader: function() {
        var options = {
            container_id: '#screen',
            content: "screen.affirmationPopup",
            extras: {
                action: "loading"
            }
        };

        this.publish('navigation.dialog.show', options);
    },

    hideLoader: function() {
        var options = {
            container_id: '#screen',
            content: "screen.affirmationPopup",
            extras: {
                action: "loading"
            }
        };

        this.publish('navigation.dialog.close', options);
    }

}));