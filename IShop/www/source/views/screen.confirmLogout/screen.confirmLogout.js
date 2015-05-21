RAD.view("screen.confirmLogout", RAD.Blanks.View.extend({

    url: 'source/views/screen.confirmLogout/screen.confirmLogout.html',

    onInitialize: function () {
        this.model = RAD.model("model.confirmLogout");
    },

    events: {
        'tap .yes-button': "logout",
        'tap .no-button': "closePopup"
    },

    logout: function() {
        this.closePopup();
        this.deleteUser();

        var options = {
            container_id: '#screen',
            content: "screen.login",
            animation: "none",
            backstack: false
        };

        this.publish("navigation.show", options);

    },

    closePopup: function() {
        var options = {
            container_id: '#screen',
            content: "screen.confirmLogout"
        };

        this.publish('navigation.dialog.close', options);
    },

    deleteUser: function() {
        RAD.namespace("user").clearCredentials();
    }


}));