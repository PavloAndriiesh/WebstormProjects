RAD.view("screen.productDetails", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.productDetails/screen.productDetails.html',

    onInitialize: function () {
        this.model = RAD.model('model.productDetails');
    },

    onStartAttach: function() {
        document.getElementById("add-quantity").addEventListener("change", this.calculateAdd);
        document.getElementById("remove-quantity").addEventListener("change", this.calculateRemove);
    },

    onNewExtras: function (extras) {
        console.log("onNewExtras");
        console.log(extras);


        if (extras.source === "listOfProducts") {

            var array = JSON.parse(JSON.stringify(RAD.model("collection.listOfProducts")));

            this.model.set(_.find(array, function(item) { return item.id === +extras.id} ));
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

    },

    remove: function() {

    },

    calculateAdd: function() {
        var quantity = document.getElementById("price-add").innerHTML.trim();
    },

    calculateRemove: function() {
        var quantity = document.getElementById("price-remove").innerHTML.trim();
    }

}));