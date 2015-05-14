RAD.service("service.dataSource", RAD.Blanks.Service.extend({

    onReceiveMsg: function (channel, data) {

        var parts = channel.split('.'),
            command = parts[parts.length - 1];

        switch (command) {
            case "refreshGoods":
                this.refreshGoods(data);
                break;
        }
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

        car: [{
            id: 1,
            title_en: "car1",
            title_ru: "машина1",
            description_en: "car description1",
            description_ru: "описание машины1",
            price: 1231,
            category: "car",
            min_quantity: 1
        },
            {
                id: 2,
                title_en: "car2",
                title_ru: "машина2",
                description_en: "car description2",
                description_ru: "описание машины2",
                price: 1231,
                category: "car",
                min_quantity: 1
            }],

        house: [{
            id: 3,
            title_en: "house1",
            title_ru: "дом1",
            description_en: "house description1",
            description_ru: "описание дома1",
            price: 12431,
            category: "house",
            min_quantity: 1
        }, {
            id: 4,
                title_en: "house2",
                title_ru: "дом2",
                description_en: "house description2",
                description_ru: "описание дома2",
                price: 12321,
                category: "house",
                min_quantity: 1
            }],

        alcohol: [{
            id: 5,
            title_en: "alcohol1",
            title_ru: "алкоголь1",
            description_en: "alcohol description1",
            description_ru: "описание алкоголь1",
            price: 12431,
            category: "alcohol",
            min_quantity: 1
        },
            {
                id: 6,
                title_en: "alcohol2",
                title_ru: "алкоголь2",
                description_en: "alcohol description2",
                description_ru: "описание алкоголь2",
                price: 12321,
                category: "alcohol",
                min_quantity: 1
            }],

        food: [{
            id: 7,
            title_en: "food1",
            title_ru: "еда1",
            description_en: "food description1",
            description_ru: "описание еда1",
            price: 12431,
            category: "food",
            min_quantity: 10
        },
            {
                id: 8,
                title_en: "food2",
                title_ru: "еда2",
                description_en: "food description2",
                description_ru: "описание еда2",
                price: 12321,
                category: "food",
                min_quantity: 10
            }],

        computer:
            [
                {
                    id: 9,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 12431,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 10,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 12321,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 11,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 12431,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 12,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 12321,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 13,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 12431,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 14,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 12321,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 15,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 12431,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 16,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 12321,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 17,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 12431,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 18,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 12321,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 19,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 12431,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 20,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 12321,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 21,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 12431,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 22,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 12321,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 23,
                    title_en: "computer1",
                    title_ru: "компьютер1",
                    description_en: "computer description1",
                    description_ru: "описание компьютер1",
                    price: 12431,
                    category: "computer",
                    min_quantity: 15
                },
                {
                    id: 24,
                    title_en: "computer2",
                    title_ru: "компьютер2",
                    description_en: "computer description2",
                    description_ru: "описание компьютер2",
                    price: 12321,
                    category: "computer",
                    min_quantity: 15
                }
            ]
    }

}));