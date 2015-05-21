RAD.service("service.dataSource", RAD.Blanks.Service.extend({

    chekedCategories: [],

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


    loadItems: function (category) {
        var that = this;

        if (!_.contains(that.chekedCategories, category)) {
            that.chekedCategories.unshift(category);
            that.loadCategory(category, onSuccess, onError);
        } else {
            that.chekedCategories = _.filter(that.chekedCategories, function(cat) {
                return cat !== category;
            });

            var newCategories = _.filter(RAD.model('collection.listOfProducts').models, function(item) {
                return item.attributes.category !== category;
            });
            RAD.model('collection.listOfProducts').reset();
            RAD.model('collection.listOfProducts').push(newCategories);

            that.hideLoader();
        }

        function onSuccess(cat) {
            RAD.model('collection.listOfProducts').push(cat);
            that.hideLoader();
        }

        function onError(error) {
            alert('Downloading data from parse.com failed, error:' + error);
        }
    },

    loadCategory: function (categoryTitle, onSuccess, onError) {
        var MyClass = Parse.Object.extend("item");
        var query = new Parse.Query(MyClass);

        query.equalTo("category", categoryTitle).find({
            success : function(response){
                onSuccess(JSON.parse(JSON.stringify(response)));
            },
            error: function(data) {
                onError(data);
            }});
    },

    loadShoppingCartData: function () {
        var MyClass = Parse.Object.extend("item");
        var query = new Parse.Query(MyClass);

        query.notEqualTo("inShoppingCart", 0).find({
            success : function(response){
                RAD.model('collection.shoppingCart').push(JSON.parse(JSON.stringify(response)));
            },
            error: function(error) {
                console.log(error);
            }});
    },

    saveShoppingCartData: function () {
        var ShoppingCart = Parse.Object.extend("item");

        _.each(JSON.parse(JSON.stringify(RAD.model('collection.shoppingCart'))), function(item) {
            var object = new ShoppingCart;

            object.save({
                objectId: item.objectId,
                inShoppingCart: item.inShoppingCart
            }, {
                success: function(data) {
                },
                error: function(error) {
                }
            });
        });
    },

    loadShoppingHistory: function () {
        var MyClass = Parse.Object.extend("ShoppingHistory");
        var query = new Parse.Query(MyClass);

        query.addDescending("date").find({
            success : function(response){
                RAD.model('collection.shoppingHistory').push(JSON.parse(JSON.stringify(response)))
            },
            error: function(error) {
                console.log(error);
            }});
    },

    saveShoppingHistory: function () {
        var ShoppingHistory = Parse.Object.extend("ShoppingHistory");
        var object = new ShoppingHistory;
        var lastPurchase = JSON.parse(JSON.stringify(RAD.model('collection.shoppingHistory')))[0];

        object.save({
            date: lastPurchase.date,
            total: lastPurchase.total
        }, {
            success: function(data) {
            },
            error: function(error) {
            }
        });
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

    setLanguage: function (lang) {
        if (RAD.namespace("user") && RAD.namespace("user").language === lang) {
            return;
        }

        RAD.namespace("user").language = lang;

        var en = {
            login: {
                welcome: "Welcome to IShop!",
                login: "Login",
                incorrect: "Your email or password is incorrect"
            },
            home: {
                hello: "Hello",
                listOfProducts: "List of products",
                shoppingCart: "Shoping cart",
                shoppingHistory: "Shopping history",
                logout: "Logout"
            },
            listOfProducts: {
                selectCategory: "Categories: (Click)",
                food: "Food",
                alcohol: "Drink",
                automobile: "Automobile",
                realEstate: "Real estate",
                computers: "Computers"
            },
            shoppingCart: {
                price: "Price",
                discount: "Discount",
                deal: "Deal",
                total: "Total",
                makeAnOrder: "Make an order"
            },
            productDetails: {
                category: "Category",
                bundle: "Bundle",
                items: "item(s)",
                addToCart: "Add to сart",
                removeFromCart: "Remove from сart"
            },
            confirmLogout: {
                confirmLogout: "Are you sure?",
                yes: "Yes",
                no: "No"
            },
            shoppingHistory: {
                shoppingHistory: "Shopping history"
            }
        };

        var ru = {
            login: {
                welcome: "Добро пожаловать в IShop!",
                login: "Войти",
                incorrect: "Ваш email или пароль неверны"
            },
            home: {
                hello: "Привет",
                listOfProducts: "Список товаров",
                shoppingCart: "Корзина",
                shoppingHistory: "История покупок",
                logout: "Выйти"
            },
            listOfProducts: {
                selectCategory: "Категории (Нажми)",
                food: "Продукты",
                alcohol: "Напитки",
                automobile: "Автомобили",
                realEstate: "Недвижимость",
                computers: "Компьютеры"
            },
            shoppingCart: {
                price: "Цена",
                discount: "Скидка",
                deal: "Акция",
                total: "Всего",
                makeAnOrder: "Сделать заказ"
            },
            productDetails: {
                category: "Категория",
                bundle: "Пачка",
                items: "штук",
                addToCart: "Добавить в корзину",
                removeFromCart: "Удалить с корзины"
            },
            confirmLogout: {
                confirmLogout: "Вы уверены?",
                yes: "Да",
                no: "Нет"
            },
            shoppingHistory: {
                shoppingHistory: "История покупок"
            }
        };

        var local;

        switch (lang) {
            case "en":
                local = en;
                break;

            case "ru":
                local = ru;
                break;
        }

        RAD.model("model.productDetails").set("local", local.productDetails);
        RAD.model("model.home").set("local", local.home);
        RAD.model("model.login").set("local", local.login);
        RAD.model("model.confirmLogout").set("local", local.confirmLogout);
        RAD.models.collection.shoppingCart.local = local.shoppingCart;
        RAD.model("collection.shoppingCart").trigger("change");
        RAD.models.collection.shoppingHistory.local = local.shoppingHistory;
        RAD.model("collection.shoppingHistory").trigger("change");
        RAD.models.collection.listOfProducts.local = local.listOfProducts;
        RAD.model("collection.listOfProducts").trigger("change");
    }

}));