RAD.view("screen.affirmationPopup", RAD.Blanks.View.extend({

    url: 'source/views/screen.affirmationPopup/screen.affirmationPopup.html',

    onInitialize: function() {
        this.model = RAD.model("model.affirmationPopup");
    },

    onNewExtras: function (extras) {

        var popupText =  RAD.t(extras.action, {
            quantity: extras.quantity
        });

        this.model.set({popupText : popupText});
    }

}));