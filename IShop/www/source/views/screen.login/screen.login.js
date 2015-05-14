RAD.view("screen.login", RAD.Blanks.View.extend({

    url: 'source/views/screen.login/screen.login.html',

    onInitialize: function () {

    },

    onStartAttach: function() {
        var that = this;
        $( "#login-button" ).click(function( event ) {
            event.preventDefault();
            that.authorize();
        });
    },

    events: {
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
        }

        if (user.password === password) {
            $(".invalid-data").addClass("hidden");
            this.login(user);
        } else (
            $(".invalid-data").removeClass("hidden")
        )
    },

    login: function(user) {

        window.user = user.email;

        this.publish('service.localStorage.saveUser', user);

        var options = {
            container_id: '#screen',
            content: "screen.home",
            backstack: true
        };

        this.publish("navigation.show", options);
    },

    getUsers: function() {
        return [
            {
                email: "user@gmail.com",
                password: "password",
                isVip: false,
                shoppingHistory: [
                    {
                        date: "01.01.2000 19:48:34",
                        price: 123821.23
                    },
                    {
                        date: "01.01.2000 19:48:34",
                        price: 123821.23
                    },
                    {
                        date: "01.01.2000 19:48:34",
                        price: 123821.23
                    },
                    {
                        date: "01.01.2000 19:48:34",
                        price: 123821.23
                    },
                    {
                        date: "01.01.2000 19:48:34",
                        price: 123821.23
                    },
                    {
                        date: "01.01.2000 19:48:34",
                        price: 123821.23
                    }
                ]
            },
            {
                email: "1",
                password: "1",
                isVip: true,
                shoppingHistory: [
                    {
                        date: "01.01.2000 19:48:34",
                        price: 123821.23
                    },
                    {
                        date: "01.01.2000 19:48:34",
                        price: 123821.23
                    },
                    {
                        date: "01.01.2000 19:48:34",
                        price: 123821.23
                    },
                    {
                        date: "01.01.2000 19:48:34",
                        price: 123821.23
                    },
                    {
                        date: "01.01.2000 19:48:34",
                        price: 123821.23
                    },
                    {
                        date: "01.01.2000 19:48:34",
                        price: 123821.23
                    }
                ]
            }
        ];
    }
}));