RAD.view("screen.login", RAD.Blanks.View.extend({

    url: 'source/views/screen.login/screen.login.html',

    onInitialize: function () {
        this.model = RAD.model("model.login");
        this.publish('service.dataSource.setLanguage', "en");
    },

    onStartAttach: function() {
        this.inputManager();
    },

    events: {
        'tap .flag' : 'changeLanguage'
    },

    inputManager: function() {
        var that = this;

        document.getElementById("email").addEventListener("input", _.bind(this.isDataEntered, this));
        document.getElementById("password").addEventListener("input",  _.bind(this.isDataEntered, this));

        $( "#login-button" ).click(function( event ) {
            that.authorizeUser();
            event.preventDefault();
        });
    },

    authorizeUser: function() {
        var users, email, password;

        try {
            users = this.getUsers();
            email = document.getElementById("email").value;
            password = document.getElementById("password").value;
        } catch(err) {
            return;
        }

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
        );

    },

    getUsers: function() {
        var request = new XMLHttpRequest();

        request.open( "GET", "http://localhost:3000/users", false );
        request.send( null );

        return JSON.parse(request.responseText);
    },

    login: function(user) {
        document.getElementById("password").value = "";
        window.user = user;

        var options = {
            container_id: '#screen',
            content: "screen.home",
            backstack: true
        };

        this.publish("navigation.show", options);
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

    changeLanguage: function(event) {
        var newLanguage = event.currentTarget.id;
        this.publish('service.dataSource.setLanguage', newLanguage);
        this.inputManager();
    }

}));