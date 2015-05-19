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

        _.each(data, function (cat) {
            that.loadCategory(cat, onSuccess, onError);
        });
    },

    loadShoppingCartData: function () {
        try {
            RAD.model('collection.shoppingCart').push(JSON.parse(window.localStorage.getItem("shoppingCart")));
        } catch (err) {
            alert("problem with downloading data");
        }
    },

    saveShoppingCartData: function () {
        try {
            window.localStorage.setItem("shoppingCart", JSON.stringify(RAD.model('collection.shoppingCart')));
        } catch (err) {
            alert("problem with saving shopping cart data");
        }
    },

    loadShoppingHistory: function () {
        try {
            RAD.model('collection.shoppingHistory').push(JSON.parse(window.localStorage.getItem("shoppingHistory")));
        } catch (err) {
            alert("problem with loading shopping history data");
        }

    },

    saveShoppingHistory: function () {
        try {
            window.localStorage.setItem("shoppingHistory", JSON.stringify(RAD.model("collection.shoppingHistory")));
        } catch (err) {
            alert("problem with saving shopping history data");
        }
    },

    setLanguage: function (lang) {
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

        switch (lang) {
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


    loadCategory: function (categoryTitle) {
        var that = this;
        var MyClass = Parse.Object.extend("item");
        var item = new MyClass();

        item.fetch({
            success : function(response){
                that.onSuccess(response);
            },
            error: function(data) {
                that.onError(data);
            }});



    },

    onSuccess: function (response) {
        console.log(response);
    },

    onError: function (error) {
        console.log("error");
        console.log(error);
    },

    saveItems: function (onSuccess, onError) {
        objects = [
            {
                "title_en": "BMW X5",
                "title_ru": "BMW X5",
                "img_url": "http://www.bmw.ru/_common/shared/newvehicles/x/x5/2013/showroom/start.jpg",
                "description_en": "Panoramic sunroof real well looked after car excellent condition and cheap car tax bracket call for more info, BLACK, Electric sunroof, Electric windows, Air conditioning, Satellite navigation, Parking aid, DVD, CD player, Leather trim, Height adjustable driver's seat, Height adjustable passenger seat, Folding rear seats, Child seat points (Isofix system), Metallic paint, 16' Alloy Wheels, Spare wheel (Full), Power steering, Steering wheel rake adjustment, Steering wheel reach adjustment, Cruise control, Traction control, Central locking, Alarm, Driver's airbags, Side airbags, Passenger airbags. 5 seats, £10,000",
                "description_ru": "ОДИН хозяин. М пакет, SPORT пакет. 7 мест СВЕТЛАЯ кожа, ПАНОРАМА. ИДЕАЛЬНЕЙШЕЕ состояние, за машиной слежу денег не жалею поэтому состояние у машины 2012года. Весь метал родной, вся краска родная, все стёкла родные. Проверяйте любыми приборами, в любом месте СТО, ГАИ, ",
                "price": 120000,
                "category": "automobile",
                "bundle": 1,
                "inShoppingCart": 0
            },
            {
                "title_en": "Mercedes SLS",
                "title_ru": "Mercedes SLS",
                "img_url": "http://a38898d4011a160a051fb191.gearheads.netdna-cdn.com/wp-content/uploads/2012/11/Mercedes-Benz-SLS-AMG-BS-012.jpg",
                "description_en": "Designo Mystic White, Service History, Two-tone Designo Exclusive Leather - Classic Red/b, 6208 cc, Electric Windows, Central Door Locking, Alarm, Immobiliser, ABS, COMAND System, Alarm and immobiliser, Aluminium trim, Headlamp Wash, Folding Mirrors, Tyre Pressure Monitoring System, Automatic Dimming Mirror, Bi Xenon Headlights with Wash System, Anti-theft alarm system including infrared interior monitoring system, Digital Media Interface, Luxury Climate Control, LED Daytime Running Lights, DAB Digital Radio, Memory Package, Enhanced Anti-Theft Protection, AMG Exterior Carbon Fibre Trim Package, Reversing Camera, 7G-DCT 7-speed automatic transmission, Adaptive Brake Lights, 11 Reg. 2 seats,",
                "description_ru": "Mercedes-Benz SLS AMG Roadster — заднеприводный двухместный родстер, появившийся в модельном ряду марки в 2011 году. Является открытой модификацией купе Mercedes-Benz SLS AMG. Хоть родстер и потерял изюминку в виде дверей типа «крыло чайки», которые являются отличительной чертой купе, зато приобрел автоматическую крышу, которая складывается всего за 11 секунд и может срабатывать на скорости до 50 км/ч.",
                "price": 60000,
                "category": "automobile",
                "bundle": 1,
                "inShoppingCart": 0
            },
            {
                "title_en": "VIP House",
                "title_ru": "VIP дом",
                "img_url": "http://www.omniaconcorsi.it/public/progetti/prog243/VH01.jpg",
                "description_en": "For buyers after a home with a stylish and luxurious finish this four bedroomed (master en-suite) home will undoubtedly prove ideal. Offering a stunning 25' kitchen family room, first floor lounge dining room, utility room, ground floor WC and first floor family bathroom. Three of the four bedrooms are doubles making this property perfect for a family home. To the outside the property offers an en bloc garage, enclosed rear garden and is pleasantly situated on the edge of the development.",
                "description_ru": "Дом расположен на холме парковой зоны на растоянии 100 метров от черты города. В 2012 сдан в эксплуатацию. Все коммуникации проведены. Материал: кирпич Забор литой по периметру: ж/б Участок: 15 соток, идеально ровный и квадратный Общая пл: 349,7 м2 Жилая: 137,5 м2 Крышка: м/ч Этажность: 2 основных + тех этах + чердак Планировка и потолки дизайнерские с уровнями Подоконники: мрамор Усиленный фундамент Готовность: 97% 1-ый эт: студио, площадь разделяют арки. 2-ой эт: 3 спальни, туалет, ванная комната, гардероб, два балкона (полностью обустроены) + технический этаж + просторный чердак с окнами ",
                "price": 500000,
                "category": "realEstate",
                "bundle": 1,
                "inShoppingCart": 0
            },
            {
                "title_en": "Cheap house",
                "title_ru": "Простой дом",
                "img_url": "http://www.themotorlesscity.com/wp-content/gallery/abandoned-houses/04210601_15_xl.jpg",
                "description_en": "Another property sold by Sinclair Estate Agents! Call ...Calling all first time/investment buyers....... This generous sized detached home has been individually built and is set on a generous plot with a 62 foot long garage that could be converted into a granny annex or more living accommodation subject to necessary planning permissions. The immaculately presented property was constructed in 2001 and occupies an established non estate location with quick and convenient access to the M1 Motorway Network via Junction 23, the M42 at Ashby, East Midlands Airport and excellent village amenities. Accommodation with uPVC double glazing, gas central heating and in brief comprises entrance hall, w.C./cloaks, lounge, dining room, conservatory, kitchen, first floor landing, 4 bedrooms, en suite shower room and family bathroom. To the outside there is extensive off road parking for 7 cars, a 62 garage plus a further single garage, and particularly private rear lawned garden with patio. The property has been fitted with solar panels in December 2012 earning the vendor £1, 200 in the first year and reducing their electricity bills by 50%. EPC rating D.",
                "description_ru": "Продается дом, ул. Межибрицкая, р-н Роша недалеко от 'Клуба', 270 кв.м., два этажа + цокольный этаж.Участок 14 соток ( 10 соток гос. акт, 4 ст. в аренде ). В доме стяжка, штукатурка, электрика. Осталось сделать отопление и малярные работы. Дом строился для себя. Полив газона.Колодец, два гаража. Тихий район.",
                "price": 70000,
                "category": "realEstate",
                "bundle": 1,
                "inShoppingCart": 0
            },
            {
                "title_en": "Vodka",
                "title_ru": "Водка",
                "img_url": "http://www.ricard.fr/sites/default/files/styles/brand_large_bottle/public/brand/bottle-history/bouteille_absolut.jpg?itok=GigKbUu6",
                "description_en": "Vodka (Polish: wódka [ˈvutka], Russian: водка [ˈvotkə]) is a distilled beverage composed primarily of water and ethanol, sometimes with traces of impurities and flavorings. Traditionally, vodka is made by the distillation of fermented cereal grains or potatoes, though some modern brands use other substances, such as fruits or sugar.Since the 1890s, the standard Polish, Russian, Ukrainian, Estonian, Latvian, Lithuanian and Czech vodkas are 40% alcohol by volume ABV (80 proof), a percentage that is widely misattributed to Dmitri Mendeleev.[1][2] The European Union has established a minimum of 37.5% ABV for any 'European vodka' to be named as such.[3][4] Products sold as 'vodka' in the United States must have a minimum alcohol content of 40%.[5] Even with these loose restrictions, most vodka sold contains 40% ABV. For homemade vodkas and distilled beverages referred to as 'moonshine', see moonshine by country.    Vodka is traditionally drunk neat (not mixed with any water, ice, or other mixer), though it is often served chilled in the vodka belt countries (Belarus, Estonia, Finland, Iceland, Latvia, Lithuania, Norway, Poland, Russia, Sweden, Ukraine). It is also commonly used in cocktails and mixed drinks, such as the vodka martini, Cosmopolitan, vodka tonic, Screwdriver, Greyhound, Black or White Russian, Bloody Mary, and Sex on the Beach.",
                "description_ru": "Во́дка — спиртной напиток, бесцветный водно-спиртовой раствор с характерным вкусом и спиртовым запахом. Процесс производства водки включает в себя приготовление исправленной воды, смешивание ректификованного[1] этилового спирта из пищевого сырья с исправленной водой, обработку водно-спиртового раствора активированным углём или модифицированным крахмалом, его фильтрование, внесение ингредиентов, если они предусмотрены рецептурой, перемешивание, контрольное фильтрование, розлив в потребительскую тару и оформление готовой продукции. При регулярном и неумеренном употреблении вызывает привыкание и алкогольную зависимость.",
                "price": 20,
                "category": "alcohol",
                "bundle": 10,
                "inShoppingCart": 0
            },
            {
                "title_en": "Beer",
                "title_ru": "Пиво",
                "img_url": "http://snowbrains.com/wp-content/uploads/2013/09/dc6a6677-0ea6-4b1f-976b-702c7a3e7a89.jpeg",
                "description_en": "Beer is an alcoholic beverage produced by the saccharification of starch and fermentation of the resulting sugar. The starch and saccharification enzymes are often derived from malted cereal grains, most commonly malted barley and malted wheat.[1] Most beer is also flavoured with hops, which add bitterness and act as a natural preservative, though other flavourings such as herbs or fruit may occasionally be included. The preparation of beer is called brewing.",
                "description_ru": "Пи́во — слабоалкогольный напиток[1], получаемый спиртовым брожением солодового сусла (чаще всего на основе ячменя) с помощью пивных дрожжей, обычно с добавлением хмеля. Содержание этилового спирта в большинстве сортов пива около 3,0-6,0 % об. (крепкое содержит, как правило, от 8 % до 14 % об., иногда также выделяют лёгкое пиво, которое содержит 1-2 % об., отдельно выделяют безалкогольное пиво, которое сюда не включают), сухих веществ (в основном углеводов) 7—10 %, углекислого газа 0,48—1,0 %",
                "price": 100,
                "category": "alcohol",
                "bundle": 5,
                "inShoppingCart": 0
            },
            {
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
                "title_en": "Steak",
                "title_ru": "Стейк",
                "img_url": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ48baKUDmNcddtA2y1eX9WQGwEG_jWNQGYYMfFhRCQU94wAVwk",
                "description_en": "A steak is a cut of meat sliced perpendicular to the muscle fibers, potentially including a bone. When the word 'steak' is used without qualification, it generally refers to a beef steak. In a larger sense, there are also fish steaks, ground meat steaks, pork steak and many more varieties.",
                "description_ru": "Стейк (англ. steak) — от английского слова 'кусок' — качественно приготовленный толстый кусок мяса, вырезанный из туши животного (как правило, бычка) чаще всего поперёк, но в некоторых случаях и вдоль волокон. Стейк, вырезанный из туши коровы чаще всего называют Бифштексом (англ. beefsteak), что в дословном переводе означает 'кусок говядины'.",
                "price": 15,
                "category": "food",
                "bundle": 100,
                "inShoppingCart": 0
            },
            {
                "title_en": "MacBook Air",
                "title_ru": "Ноутбук MacBook Air",
                "img_url": "http://www9.pcmag.com/media/images/357361-apple-macbook-air-13-inch-2014-angle.jpg",
                "description_en": "The 11-inch MacBook Air lasts up to 9 hours between charges and the 13-inch model lasts up to an incredible 12 hours. So from your morning coffee till your evening commute, you can work unplugged. When it’s time to kick back and relax, you can get up to 10 hours of iTunes movie playback on the 11-inch model and up to 12 hours on the 13-inch model. And with up to 30 days of standby time, you can go away for weeks and pick up right where you left off.",
                "description_ru": "Ноутбук Apple MacBook Air 13' (MJVE2UA/A) изготовлен из высококачественных материалов и встроенных комплектующих деталей. В комплект поставки устройства входит мощный процессор, эффектная видеокарта, а также габаритный жесткий диск. Все комплектующие детали и встроенные технологии обеспечивают высокую производительность и быстродействие работы, легкость и простоту использования прибора. Широкоформатный дисплей и большой объем оперативной памяти позволят с легкостью просматривать качественные видеофильмы, изображения и фото. Длительность и надежность работы предоставляет надежная батарея и адаптер питания.",
                "price": 1000,
                "category": "computers",
                "bundle": 1,
                "inShoppingCart": 0
            },
            {
                "title_en": "HP - Pavilion",
                "title_ru": "Ноутбук HP - Pavilion",
                "img_url": "http://www.notebookcheck.net/fileadmin/Notebooks/HP/Pavilion_17-e054sg/Pavillion_Teaser.jpg",
                "description_en": "This HP Pavilion Slimline 400-434 desktop features built-in wireless networking for simple access to the Internet. The Intel® Pentium® processor helps boost your productivity and enhance your entertainment and Internet browsing experiences.",
                "description_ru": "Абсолютная надежность для любых задач. HP Pavilion 17 позволит выполнять любые операции без сбоев. Развлекайтесь сколько душе угодно на надежном проверенном ПК. Наслаждайтесь великолепным цветом и графикой на большом экране. Удобные порты для подключения устройств, встроенный DVD-привод и цифровая клавиатура.",
                "price": 2000,
                "category": "computers",
                "bundle": 1,
                "inShoppingCart": 0
            },
            {
                "title_en": "Dell Alienware 18",
                "title_ru": "Ноутбук Dell Alienware 18",
                "img_url": "http://alien-shop.com.ua/image/cache/data/Dell%20Alienware%2017%20Ranger/2-950x650.jpg",
                "description_en": "Dell's Alienware 18 is highly configurable, with dual video cards, tons of RAM and storage space, and an understated design that you won't hate.",
                "description_ru": "Представляем вам самый мощный в мире 18.4' ноутбук. Новый Alienware 18 с совершенно новым дизайном оснащен двумя графическими платами, обеспечивая непревзойденное качество игр.",
                "price": 3000,
                "category": "computer",
                "bundle": 1,
                "inShoppingCart": 0
            }
        ];

        var Categories = Parse.Object.extend("item");
        var object0 = new Categories();
        var object1 = new Categories();
        var object2 = new Categories();
        var object3 = new Categories();
        var object4 = new Categories();
        var object5 = new Categories();
        var object6 = new Categories();
        var object7 = new Categories();
        var object8 = new Categories();
        var object9 = new Categories();
        var object10 = new Categories();

        object0.save(objects[0]);
        object1.save(objects[1]);
        object2.save(objects[2]);
        object3.save(objects[3]);
        object4.save(objects[4]);
        object5.save(objects[5]);
        object6.save(objects[6]);
        object7.save(objects[7]);
        object8.save(objects[8]);
        object9.save(objects[9]);
        object10.save(objects[10]);

    }
}));