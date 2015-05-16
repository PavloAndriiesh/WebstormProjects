RAD.view("toast.movedToShoppingCart", RAD.Blanks.View.extend({

    url: 'source/views/toast.movedToShoppingCart/toast.movedToShoppingCart.html',

    popupText : "",

    onInitialize: function() {
        this.model = RAD.model("model.movedToSCToast");
    },

    onNewExtras: function (extras) {
        var popupText = "";

        switch(window.language) {
            case "en":
                if(extras.action === 'add') {
                    popupText = "Added " + extras.quantity + " item(s) to the shopping cart";
                } else if (extras.action === 'remove'){
                    popupText = "Removed " + extras.quantity + " item(s) from the shopping cart";
                } else if (extras.action === 'order') {
                    popupText = "Thank you for shopping at IShop!"
                }
                break;

            case "ru":
                if(extras.action === 'add') {
                    popupText = "��������� " + extras.quantity + " ������������ � �������";
                } else if (extras.action === 'remove'){
                    popupText = "������� " + extras.quantity + " ������������ �� �������";
                } else if (extras.action === 'order') {
                    popupText = "������� ��� �� ������� � IShop!"
                }
                break;
        }

        this.model.set({popupText : popupText});
    }
}));