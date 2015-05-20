RAD.view("screen.login", RAD.Blanks.View.extend({

    url: 'source/views/screen.login/screen.login.html',

    onInitialize: function () {
        this.model = RAD.model("model.login");
        this.createUser();
        this.publish('service.dataSource.setLanguage', "en");
    },

    onStartAttach: function () {
        this.inputManager();
    },

    events: {
        'tap .flag': 'changeLanguage'
    },

    inputManager: function () {
        var that = this;

        document.getElementById("email").addEventListener("input", _.bind(this.isDataEntered, this));
        document.getElementById("password").addEventListener("input", _.bind(this.isDataEntered, this));

        $("#login-button").click(function (event) {
            that.authorizeUser();
            event.preventDefault();
        });
    },

    authorizeUser: function () {
        this.showLoader();
        var that = this;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        Parse.User.logIn(email, password, {
            success: function(user) {
                $(".invalid-data").addClass("hidden");
                that.login(user);
                that.hideLoader();
            },
            error: function(user, error) {
                $(".invalid-data").removeClass("hidden");
                that.hideLoader();
            }
        });
    },

    login: function (user) {
        if (!document.getElementById("password"))
            return;

        document.getElementById("password").value = "";

        RAD.namespace("user").email = user.attributes.email;
        RAD.namespace("user").isVip = user.attributes.isVip;

        var options = {
            container_id: '#screen',
            content: "screen.home",
            backstack: true
        };

        this.publish('navigation.show', options);
    },

    isDataEntered: function () {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        if (!email.trim() || !password.trim()) {
            document.getElementById("login-button").setAttribute("disabled", "true");
        } else {
            document.getElementById("login-button").removeAttribute("disabled");
        }
    },

    changeLanguage: function (event) {
        var newLanguage = event.currentTarget.id;
        this.publish('service.dataSource.setLanguage', newLanguage);
        this.inputManager();
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
    },

    createUser: function() {
        RAD.namespace("user", {
            email: "",
            isVip: "",
            language: ""
        });
    }

}));