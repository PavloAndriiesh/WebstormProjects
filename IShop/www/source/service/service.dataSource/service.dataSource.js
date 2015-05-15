RAD.service("service.dataSource", RAD.Blanks.Service.extend({

    onReceiveMsg: function (channel, data) {

        var parts = channel.split('.'),
            command = parts[parts.length - 1];

        switch (command) {

            case 'loadUser':
                this.loadUser(data);
                break;

            case "saveUser":
                this.saveUser(data);
                break;

            case "refreshGoods":
                this.refreshGoods(data);
                break;

            case "downloadShoppingCartData":
                this.downloadShoppingCartData(data);
                break;

            case "uploadShoppingCartData":
                this.uploadShoppingCartData(data);
                break;

            case "loadShoppingHistory":
                this.loadShoppingHistory(data);
                break;

            case "saveShoppingHistory":
                this.saveShoppingHistory(data);
                break;
        }
    },

    loadUser: function () {
        if (!this.isLocalStorageSupported()) {
            return false;
        }

        try {
            JSON.parse(window.localStorage.getItem("user"));
        } catch (err) {
            this.saveUser();
            return;
        }

        window.user = JSON.parse(window.localStorage.getItem("user"));
    },

    saveUser: function (data) {
        if (!this.isLocalStorageSupported()) {
            return false;
        }

        window.localStorage.setItem("user", JSON.stringify(data));
    },

    refreshGoods: function (data) {
        var that = this;

        try {
            JSON.parse(window.localStorage.getItem("user"));
        } catch (err) {
            this.saveUser();
            return;
        }

        RAD.model('collection.listOfProducts').reset();

        _.each(data, function(cat) {
            RAD.model('collection.listOfProducts').push(that.loadCategory(cat));
        });
    },

    downloadShoppingCartData: function() {
        try {
            JSON.parse(window.localStorage.getItem("shoppingCart"));
        } catch (err) {
            alert("problem with downloading data");
            RAD.model('collection.shoppingCart').reset();
            RAD.model('collection.shoppingCart').push([]);
            return;
        }

        RAD.model('collection.shoppingCart').push(JSON.parse(window.localStorage.getItem("shoppingCart")));
    },

    uploadShoppingCartData: function(data) {
        try {
            window.localStorage.setItem("shoppingCart", JSON.stringify(RAD.model('collection.shoppingCart')) );
        } catch (err) {
            alert("problem with uploading data");
        }
    },

    isLocalStorageSupported: function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },

    loadShoppingHistory: function() {
        try {
            JSON.parse(window.localStorage.getItem("shoppingHistory"));
        } catch (err) {
            alert("problem with downloading data");
            RAD.model('collection.shoppingHistory').reset();
            RAD.model('collection.shoppingHistory').push([]);
            return;
        }

        RAD.model('collection.shoppingHistory').push(JSON.parse(window.localStorage.getItem("shoppingHistory")));
    },

    saveShoppingHistory: function() {
        console.log(JSON.stringify(RAD.model("collection.shoppingHistory")));

        try {
            window.localStorage.setItem("shoppingHistory", JSON.stringify(RAD.model("collection.shoppingHistory")) );
        } catch (err) {
            alert("problem with uploading data");
        }
    },

    loadCategory: function(cat) {
        var that = this;

        switch (cat) {
            case "car":
                return that.data.car;

            case "house":
                return that.data.house;

            case "alcohol":
                return that.data.alcohol;

            case "food":
                return that.data.food;

            case "computer":
                return that.data.computer;
        }
    },

    data: {

        car:
            [
                {
                    id: 1,
                    title_en: "car1",
                    title_ru: "машина1",
                    description_en: "car description1",
                    description_ru: "описание машины1",
                    price: 120000,
                    category: "car",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 2,
                    title_en: "car2",
                    title_ru: "машина2",
                    description_en: "car description2",
                    description_ru: "описание машины2",
                    price: 60000,
                    category: "car",
                    bundle: 1,
                    inShoppingCart: 0
                }
            ],

        house:
            [
                {
                    id: 3,
                    title_en: "house1",
                    title_ru: "дом1",
                    description_en: "house description1",
                    description_ru: "описание дома1",
                    price: 500000,
                    category: "house",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 4,
                    title_en: "house2",
                    title_ru: "дом2",
                    description_en: "house description2",
                    description_ru: "описание дома2",
                    price: 700000,
                    category: "house",
                    bundle: 1,
                    inShoppingCart: 0
                }
            ],

        alcohol:
            [
                {
                    id: 5,
                    title_en: "alcohol1",
                    title_ru: "алкоголь1",
                    description_en: "alcohol description1",
                    description_ru: "описание алкоголь1",
                    price: 20,
                    category: "alcohol",
                    bundle: 10,
                    inShoppingCart: 0
                },
                {
                    id: 6,
                    title_en: "alcohol2",
                    title_ru: "алкоголь2",
                    description_en: "alcohol description2",
                    description_ru: "описание алкоголь2",
                    price: 100,
                    category: "alcohol",
                    bundle: 5,
                    inShoppingCart: 0
                }
            ],

        food:
            [
                {
                    id: 7,
                    title_en: "food1",
                    title_ru: "еда1",
                    description_en: "food description1",
                    description_ru: "описание еда1",
                    price: 10,
                    category: "food",
                    bundle: 100,
                    inShoppingCart: 0
                },
                {
                    id: 8,
                    title_en: "food2",
                    title_ru: "еда2",
                    description_en: "food description2",
                    description_ru: "описание еда2",
                    price: 15,
                    category: "food",
                    bundle: 100,
                    inShoppingCart: 0
                }
            ],

        computer:
            [
                {
                    id: 9,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 1000,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 10,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 2000,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 11,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 3000,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 12,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 4000,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 13,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 5000,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 14,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 6000,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 15,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 7000,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 16,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 8000,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 17,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 9000,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 18,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 9999,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 19,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 10000,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 20,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 11111,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 21,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 12431,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 22,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 13321,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 23,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 14444,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                },
                {
                    id: 24,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 15000,
                    category: "computer",
                    bundle: 1,
                    inShoppingCart: 0
                }
            ]
    }

}));