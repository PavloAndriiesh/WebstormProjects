RAD.view("screen.confirmLogout", RAD.Blanks.View.extend({

    url: 'source/views/screen.confirmLogout/screen.confirmLogout.html',

    onInitialize: function () {
        this.model = RAD.model("model.confirmLogout");
    },

    events: {
        'tap .yes-button': "logout",
        'tap .no-button': "cancel"
    },

    logout: function() {
        this.publish('navigation.dialog.close', {content: "screen.confirmLogout"});

        var options = {
            container_id: '#screen',
            content: "screen.login",
            animation: "none",
            backstack: false
        };

        this.publish("navigation.show", options);
    },

    cancel: function() {
        var options = {
            container_id: '#screen',
            content: "screen.confirmLogout"
        };

        this.publish('navigation.dialog.close', options);
    }


}));