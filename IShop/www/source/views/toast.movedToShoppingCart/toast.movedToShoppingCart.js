RAD.view("toast.movedToShoppingCart", RAD.Blanks.View.extend({

    url: 'source/views/toast.movedToShoppingCart/toast.movedToShoppingCart.html',

    popupText : "",

    onInitialize: function() {
        this.model = RAD.model("model.movedToSCToast");
    },

    onNewExtras: function (extras) {
        var popupText = "";
        if(extras.action === 'add') {
            popupText = "Added " + extras.quantity + " item(s) to the shopping cart";
        } else if (extras.action === 'remove'){
            popupText = "Removed " + extras.quantity + " item(s) from the shopping cart";
        } else if (extras.action === 'order') {
            popupText = "Thank you for shopping at IShop!"
        }

        this.model.set({popupText : popupText});
    }
}));