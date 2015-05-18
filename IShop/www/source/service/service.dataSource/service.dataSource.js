RAD.service("service.dataSource", RAD.Blanks.Service.extend({

    onReceiveMsg: function (channel, data) {

        var parts = channel.split('.'),
            command = parts[parts.length - 1];

        switch (command) {
            case "loadItems":
                this.loadItems(data);
                break;

            case "saveItems":
                this.saveItems(data);
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

        function onSuccess(category) {
            //RAD.model('collection.listOfProducts').push(category);
            console.log(category);
        }

        function onError(error) {
            alert('Downloading data from parse.com failed, error:' + error);
        }

        _.each(data, function(cat) {
            that.loadCategory(cat, onSuccess, onError);
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

    setLanguage: function(lang) {
        window.language = lang;

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

        switch(lang) {
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


    loadCategory: function(categoryTitle, onSuccess, onError) {
        //var request = new XMLHttpRequest();
        //
        //request.open( "GET", "http://localhost:3000/" + categoryTitle, true );
        //
        //request.onload = function () {
        //    console.info('ON LOAD');
        //    onSuccess(JSON.parse(this.responseText));
        //};
        //request.onerror = function () {
        //    console.warn('ON ERROR');
        //    onError();
        //};
        //request.ontimeout = function () {
        //    console.warn('ON TIMEOUT');
        //    onError();
        //};
        //
        //request.send();


        //var MyClass = Parse.Object.extend("items");
        //var objectDownloaded = new MyClass();
        //
        //objectDownloaded.fetch({
        //    success : function(response){
        //        onSuccess(response.attributes.results[0].data);
        //    },
        //    error: function(data) {
        //        onError(data);
        //    }});
        this.saveItems(this.onSuccess(), this.onError());
    },

    onSuccess: function(response) {
        console.log(response);
    },

    onError: function(error) {
        alert(error);
    },

    saveItems: function(onSuccess, onError) {
        var MyClass = Parse.Object.extend("categoryFood");
        var object = new MyClass();
        object.set("", "");

        object.save({
                "id": 7,
                "title_en": "Cake",
                "title_ru": "Торт",
                "img_url": "https://secure.static.tumblr.com/82b323c3c74af97c328ede137021d206/l51xbld/sDCn4hh8q/tumblr_static_c1.jpg",
                "description_en": "Cake is a form of sweet dessert that is typically baked. In its oldest forms, cakes were modifications of breads but now cover a wide range of preparations that can be simple or elaborate and share features with other desserts such as pastries, meringues, custards and pies.",
                "description_ru": "Торт (от итал. torta, ранее от лат. tōrta, круглый хлеб) — десерт, состоящий из одного или нескольких коржей, пропитанных кремом или джемом. Сверху торт обычно украшают кремом, глазурью и/или фруктами.",
                "price": 10,
                "category": "food",
                "bundle": 100,
                "inShoppingCart": 0
            },
            {
                "id": 8,
                "title_en": "Steak",
                "title_ru": "Стейк",
                "img_url": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ48baKUDmNcddtA2y1eX9WQGwEG_jWNQGYYMfFhRCQU94wAVwk",
                "description_en": "A steak is a cut of meat sliced perpendicular to the muscle fibers, potentially including a bone. When the word 'steak' is used without qualification, it generally refers to a beef steak. In a larger sense, there are also fish steaks, ground meat steaks, pork steak and many more varieties.",
                "description_ru": "Стейк (англ. steak) — от английского слова 'кусок' — качественно приготовленный толстый кусок мяса, вырезанный из туши животного (как правило, бычка) чаще всего поперёк, но в некоторых случаях и вдоль волокон. Стейк, вырезанный из туши коровы чаще всего называют Бифштексом (англ. beefsteak), что в дословном переводе означает 'кусок говядины'.",
                "price": 15,
                "category": "food",
                "bundle": 100,
                "inShoppingCart": 0
            });
    }
}));