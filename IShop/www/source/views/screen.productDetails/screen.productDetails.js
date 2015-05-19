RAD.view("screen.productDetails", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.productDetails/screen.productDetails.html',

    onInitialize: function () {
        this.model = RAD.model('model.productDetails');
    },

    onStartAttach: function() {
        this.addListeners();
    },

    onNewExtras: function (extras) {
        this.defineModel(extras);
    },

    events: {
        'tap .back-button': 'back',
        'tap .add-button' : "addItemsToShoppingCart",
        'tap .remove-button': 'removeItemsFromShoppingCart',
        'tap .flag': 'changeLanguage',
        'tap #add-add': "addToAdd",
        'tap #remove-add': "removeFromAdd",
        'tap #add-remove': "addToRemove",
        'tap #remove-remove': "removeFromRemove"
    },

    defineModel: function (extras) {
        if (extras.source === "listOfProducts") {
            this.model.set(_.find(RAD.model("collection.listOfProducts").models,
                function(item) {
                    return item.attributes.objectId === extras.id}));

        } else if (extras.source === "shoppingCart") {
            this.model.set(_.find(RAD.model("collection.shoppingCart").models,
                function(item) {
                    return item.attributes.objectId === extras.id} ));
        } else {
            console.log("Fatal error while defining model")
        }
    },

    back: function () {
        this.publish('router.back', null);
    },

    addItemsToShoppingCart: function() {
        var that = this;
        var quantity = +document.getElementById("add-quantity").value.trim();

        var item = _.find(JSON.parse(JSON.stringify(RAD.model("collection.shoppingCart"))),
            function(item) {
                return item.objectId === that.model.attributes.attributes.objectId;});

        if(item) {
            item.inShoppingCart += quantity;
            var otherItems = _.filter(JSON.parse(JSON.stringify(RAD.model("collection.shoppingCart"))),
                function(item) {
                    return item.objectId !== that.model.attributes.attributes.objectId;});

            RAD.model("collection.shoppingCart").reset();
            RAD.model("collection.shoppingCart").push(item);
            RAD.model("collection.shoppingCart").push(otherItems);

        } else {
            var newItem = JSON.parse(JSON.stringify(this.model.attributes));
            newItem.inShoppingCart += quantity;
            RAD.model("collection.shoppingCart").unshift(newItem);
        }

        that.publish('service.dataSource.saveShoppingCartData', quantity);
        that.showAffirmationPopup("add", quantity);
    },

    removeItemsFromShoppingCart: function() {
        var that = this;
        var quantity = +document.getElementById("remove-quantity").value.trim();
        console.log(RAD.model("collection.shoppingCart").models);

        var item = _.find(RAD.model("collection.shoppingCart").models,
            function(item) {
                return item.attributes.objectId === that.model.attributes.attributes.objectId;});

        console.log(item);
        if(!item || item.attributes.inShoppingCart === 0) {
            alert("There is no such item(s) in your shopping cart");
            return;
        }

        if (item.attributes.inShoppingCart < quantity) {
            alert("There is only " + item.attributes.inShoppingCart + " items in you shopping cart");
            return;
        }

        item.attributes.inShoppingCart -= quantity;
        this.publish('service.dataSource.saveShoppingCartData');

        if (item.attributes.inShoppingCart === 0) {
            var newItemsCollection = _.filter(RAD.model("collection.shoppingCart").models,
                function(item) {
                    return item.attributes.objectId !== that.model.attributes.attributes.objectId;});

            RAD.model("collection.shoppingCart").reset();
            RAD.model("collection.shoppingCart").push(newItemsCollection);
        }

        RAD.model("collection.shoppingCart").trigger("change");
        that.showAffirmationPopup("remove", quantity);
    },

    showAffirmationPopup: function(action, quantity) {
        var that = this;
        var popupDelay = 500;

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

    addToAdd: function() {
        var quantity = +document.getElementById("add-quantity").value;
        quantity += +this.model.attributes.attributes.bundle;

        document.getElementById("add-quantity").value = quantity;
        this.calculateAdd();
    },

    removeFromAdd: function() {
        var quantity = +document.getElementById("add-quantity").value;
        quantity -= +this.model.attributes.attributes.bundle;

        if(quantity <= 0) {
            return;
        }

        document.getElementById("add-quantity").value = quantity;
        this.calculateAdd();
    },

    addToRemove: function() {
        var quantity = +document.getElementById("remove-quantity").value;
        quantity += +this.model.attributes.attributes.bundle;

        document.getElementById("remove-quantity").value = quantity;
        this.calculateRemove();
    },

    removeFromRemove: function() {
        var quantity = +document.getElementById("remove-quantity").value;
        quantity -= +this.model.attributes.attributes.bundle;

        if(quantity <= 0) {
            return;
        }

        document.getElementById("remove-quantity").value = quantity;
        this.calculateRemove();
    },

    addListeners: function() {
        document.getElementById("add-quantity").addEventListener("input", _.bind(this.calculateAdd, this));
        document.getElementById("remove-quantity").addEventListener("input",  _.bind(this.calculateRemove, this));
    },

    calculateAdd: function() {
        var quantity = document.getElementById("add-quantity").value.trim();

        if (!this.isQuantityValid(quantity)) {
            document.getElementById("price-add").innerHTML = "Incorrect quantity!";
            document.getElementById("add-button").setAttribute("disabled", "true");
            return;
        }

        document.getElementById("add-button").removeAttribute("disabled");
        document.getElementById("price-add").innerHTML = quantity*this.model.attributes.attributes.price + " UAH";
    },

    calculateRemove: function() {
        var quantity = document.getElementById("remove-quantity").value.trim();

        if (!this.isQuantityValid(quantity)) {
            document.getElementById("price-remove").innerHTML = "Incorrect quantity!";
            document.getElementById("remove-button").setAttribute("disabled", "true");
            return;
        }

        document.getElementById("remove-button").removeAttribute("disabled");
        document.getElementById("price-remove").innerHTML = "-" + quantity*this.model.attributes.attributes.price + " UAH";
    },

    isQuantityValid: function(quantity) {

        if (quantity % this.model.attributes.attributes.bundle !== 0)
            return false;

        if (isNaN(quantity))
            return false;

        if (quantity % 1 != 0)
            return false;

        return true;
    },

    changeLanguage: function(event) {
        var newLanguage = event.currentTarget.id;
        this.publish('service.dataSource.setLanguage', newLanguage);
        this.addListeners();
    }

}));