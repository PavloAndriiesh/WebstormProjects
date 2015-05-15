RAD.view("screen.productDetails", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.productDetails/screen.productDetails.html',

    onInitialize: function () {
        this.model = RAD.model('model.productDetails');
    },

    onStartAttach: function() {
        this.addListeners();
    },

    onNewExtras: function (extras) {
        var array;
        if (extras.source === "listOfProducts") {

            array = RAD.model("collection.listOfProducts").models;

            var found = (_.find(array, function(item) {
                return item.id === +extras.id}));

            this.model.set(found);

        } else if (extras.source === "shoppingCart") {

            array = RAD.model("collection.shoppingCart").models;

            this.model.set(_.find(array, function(item) {
                return item.id === +extras.id} ));
        }
    },

    events: {
        'tap .back-button': 'back',
        'tap .add-button' : "add",
        'tap .remove-button': 'remove'
    },

    back: function () {
        this.publish('router.back', null);
    },

    add: function() {
        console.log(this.model);

        var that = this;
        var quantity = +document.getElementById("add-quantity").value.trim();

        var found = _.find(JSON.parse(JSON.stringify(RAD.model("collection.shoppingCart"))),
            function(item) {
                return item.id === that.model.id;});

        if(found) {
            found.inShoppingCart += quantity;

            newArray = _.filter(JSON.parse(JSON.stringify(RAD.model("collection.shoppingCart"))),
                function(item) { return item.id !== that.model.id;});

            RAD.model("collection.shoppingCart").reset();
            RAD.model("collection.shoppingCart").push(found);
            RAD.model("collection.shoppingCart").push(newArray);

        } else {
            var addedItem = JSON.parse(JSON.stringify(this.model.attributes));
            addedItem.inShoppingCart += quantity;

            RAD.model("collection.shoppingCart").push(addedItem);
        }

        this.publish('service.dataSource.uploadShoppingCartData', quantity);

        document.getElementsByClassName("added-spoiler")[0].innerHTML = "Added " + quantity + " item(s) to shopping cart!";
        $(".removed-spoiler").addClass("hidden");
        $(".added-spoiler").removeClass("hidden");
        RAD.model("collection.shoppingCart").trigger("change");
    },

    remove: function() {
        var that = this;
        var quantity = +document.getElementById("remove-quantity").value.trim();

        var found = _.find(RAD.model("collection.shoppingCart").models,
            function(item) {return item.attributes.id === that.model.id;});

        if(!found) {
            alert("there is no such item in shopping cart");
            return;
        }

        if (found.attributes.inShoppingCart === 0) {
            alert("there is no such item(s) in you shopping cart yet");
            return;
        }

        if (found.attributes.inShoppingCart < quantity) {
            alert("there is only " + found.attributes.inShoppingCart + " item(s) in you shopping cart");
            return;
        }

        found.attributes.inShoppingCart -= quantity;

        if (found.attributes.inShoppingCart === 0) {

            var newModels = _.filter(RAD.model("collection.shoppingCart").models, function(item) {
                return item.attributes.id !== that.model.id;
            });

            RAD.model("collection.shoppingCart").reset();
            RAD.model("collection.shoppingCart").push(newModels);
        }

        this.publish('service.dataSource.uploadShoppingCartData', quantity);

        document.getElementsByClassName("removed-spoiler")[0].innerHTML = "Removed " + quantity + " item(s) from shopping cart!";
        $(".added-spoiler").addClass("hidden");
        $(".removed-spoiler").removeClass("hidden");
        RAD.model("collection.shoppingCart").trigger("change");
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
    }

}));