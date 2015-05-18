RAD.service("service.dataSource", RAD.Blanks.Service.extend({

    onReceiveMsg: function (channel, data) {

        var parts = channel.split('.'),
            command = parts[parts.length - 1];

        switch (command) {
            case "loadItems":
                this.loadItems(data);
                break;

            case "loadShoppingCartData":
                this.loadShoppingCartData(data);
                break;

            case "saveShoppingCartData":
                this.saveShoppingCartData(data);
                break;

            case "loadShoppingHistory":
                this.loadShoppingHistory(data);
                break;

            case "saveShoppingHistory":
                this.saveShoppingHistory(data);
                break;

            case "setLanguage":
                this.setLanguage(data);
                break;
        }
    },

    loadItems: function (data) {
        var that = this;
        RAD.model('collection.listOfProducts').reset();

        _.each(data, function(cat) {
            RAD.model('collection.listOfProducts').push(that.loadCategory(cat));
        });
    },

    loadShoppingCartData: function() {
        try {
            RAD.model('collection.shoppingCart').push(JSON.parse(window.localStorage.getItem("shoppingCart")));
        } catch (err) {
            alert("problem with downloading data");
        }
    },

    saveShoppingCartData: function() {
        try {
            window.localStorage.setItem("shoppingCart", JSON.stringify(RAD.model('collection.shoppingCart')) );
        } catch (err) {
            alert("problem with saving shopping cart data");
        }
    },

    loadShoppingHistory: function() {
        try {
            RAD.model('collection.shoppingHistory').push(JSON.parse(window.localStorage.getItem("shoppingHistory")));
        } catch (err) {
            alert("problem with loading shopping history data");
        }

    },

    saveShoppingHistory: function() {
        try {
            window.localStorage.setItem("shoppingHistory", JSON.stringify(RAD.model("collection.shoppingHistory")) );
        } catch (err) {
            alert("problem with saving shopping history data");
        }
    },

    setLanguage: function(data) {
        window.language = data;

        var local;
        var en = {
            login: "Login",
            incorrect: "Your email or password is incorrect",
            hello: "Hello",
            listOfProducts: "List of products",
            shoppingCart: "Shoping cart",
            shoppingHistory: "Shopping history",
            logout: "Logout",
            category: "Category",
            bundle: "Bundle",
            items: "item(s)",
            addToCart: "Add to сart",
            removeFromCart: "Remove from сart",
            price: "Price",
            discount: "Discount",
            deal: "Deal",
            total: "Total",
            makeAnOrder: "Make an order",
            selectCategory: "Categories: (Click)",
            food: "Food",
            alcohol: "Drink",
            automobile: "Automobile",
            realEstate: "Real estate",
            computers: "Computers",
            welcome: "Welcome to the IShop!",
            confirmLogout: "Are you sure?",
            yes: "Yes",
            no: "No"
        };

        var ru = {
            login: "Войти",
            incorrect: "Ваш email или пароль неверны",
            hello: "Привет",
            listOfProducts: "Список товаров",
            shoppingCart: "Корзина",
            shoppingHistory: "История покупок",
            logout: "Выйти",
            category: "Категория",
            bundle: "Пачка",
            items: "штук",
            addToCart: "Добавить в корзину",
            removeFromCart: "Удалить с корзины",
            price: "Цена",
            discount: "Скидка",
            deal: "Акция",
            total: "Всего",
            makeAnOrder: "Сделать заказ",
            selectCategory: "Категории (Нажми)",
            food: "Продукты",
            alcohol: "Напитки",
            automobile: "Автомобили",
            realEstate: "Недвижимость",
            computers: "Компьютеры",
            welcome: "Добро пожаловать в IShop!",
            confirmLogout: "Вы уверены?",
            yes: "Да",
            no: "Нет"
        };

        switch(data) {
            case "en":
                local = en;
                break;

            case "ru":
                local = ru;
                break;
        }

        RAD.model("model.productDetails").set("local", local);
        RAD.model("model.home").set("local", local);
        RAD.model("model.login").set("local", local);
        RAD.model("model.confirmLogout").set("local", local);
        RAD.models.collection.shoppingCart.local = local;
        RAD.model("collection.shoppingCart").trigger("change");
        RAD.models.collection.shoppingHistory.local = local;
        RAD.model("collection.shoppingHistory").trigger("change");
        RAD.models.collection.listOfProducts.local = local;
        RAD.model("collection.listOfProducts").trigger("change");
    },


    loadCategory: function(cat) {
        var request = new XMLHttpRequest();

        request.open( "GET", "http://localhost:3000/" + cat, false );
        request.send( null );

        return JSON.parse(request.responseText);
    }
}));