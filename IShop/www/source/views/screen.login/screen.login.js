RAD.view("screen.login", RAD.Blanks.View.extend({

    url: 'source/views/screen.login/screen.login.html',

    onInitialize: function () {
    },

    onStartAttach: function() {
        var that = this;

        $( "#login-button" ).click(function( event ) {
            event.preventDefault();
            that.authorize()
        });

        that.addListeners();
    },

    events: {
        'tap .login-button' : "authorize"
    },

    authorize: function() {
        var users = this.getUsers();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        var user = _.find(users, function(user){
            if (user.email === email)
                return true; });

        if(!user) {
            $(".invalid-data").removeClass("hidden");
            return;
        }

        if (user.password === password) {
            $(".invalid-data").addClass("hidden");
            this.login(user);
        } else (
            $(".invalid-data").removeClass("hidden")
        )
    },

    login: function(user) {
        window.user = user;
        this.publish('service.dataSource.saveUser', user);

        var options = {
            container_id: '#screen',
            content: "screen.home",
            backstack: true
        };

        this.publish("navigation.show", options);
    },

    addListeners: function() {
        document.getElementById("email").addEventListener("input", _.bind(this.isDataEntered, this));
        document.getElementById("password").addEventListener("input",  _.bind(this.isDataEntered, this));
    },

    isDataEntered: function() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        if (!email.trim() || !password.trim()) {
            document.getElementById("login-button").setAttribute("disabled", "true");
        } else {
            document.getElementById("login-button").removeAttribute("disabled");
        }
    },


    getUsers: function() {
        return [
            {
                email: "user@gmail.com",
                password: "password",
                isVip: true
            },
            {
                email: "anotherUser@gmail.com",
                password: "password",
                isVip: true
            }
        ];
    }
}));