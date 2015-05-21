RAD.namespace("translation", (function () {
    var translate = {
        "Added {quantity} item(s) to the shopping cart": {
            en: "Added {quantity} item(s) to the shopping cart",
            ru: "Добавлено {quantity} найменований в корзину"
        },
        "Removed {quantity} item(s) from the shopping cart": {
            en: "Removed {quantity} item(s) from the shopping cart",
            ru: "Удалено {quantity} найменований из корзины"
        },
        "Thank you for shopping at IShop!": {
            en: "Thank you for shopping at IShop!",
            ru: "Спасибо Вам за покупки в IShop!"
        },
        "Loading": {
            en: "",
            ru: ""
        },
        "We try it {times} {times} times, but server answers HTTP {http}": {
            en: "We try it {times} {times} times, but server answers HTTP {http}",
            ru: "Мы пробовали {times} {times} раз, но сервер отвечает HTTP {http}"
        }
    };

    return {
        translate: function (text, vars) {
            console.info(text);
            var currLang = RAD.namespace("user").language;
            if (text in translate === false) {
                return "TRANSLATION NOT FOUND [" + text + "]";
            }
            if (currLang in translate[text] === false) {
                return "TRANSLATION LANGUAGE NOT FOUND [" + text + "]";
            }
            var newText = translate[text][currLang];
            _.each(Object.keys(vars), function (key) {
                var find = "{" + key + "}";
                var re = new RegExp(find, 'g');
                newText = newText.replace(re, vars[key])
            });
            return newText;
        },
        template: function (text, vars) {
            return template;
        }
    };
}()));

RAD.namespace("t", RAD.namespace("translation").translate);

/**
 * @type Function
 * Translate text
 * @param {String} text - Text that  should be translated
 * @param {Object=} vars - Variables for template
 * @return {String}
 */
RAD.t;


RAD.namespace("user", (function () {
    var userData = {
        username: "",
        email: "",
        isVip: "",
        language: ""
    };
    return {
        init: function (username, email, isVip, language) {
            userData.username = username;
            userData.email = email;
            userData.isVip = isVip;
            userData.language = language;
        },
        clearCredentials: function () {
            userData = {};
        },
        get username () {
            return userData.username;
        },
        set username (newusername) {
            if (!newusername.length) {
                return;
            }
            userData.username = newusername;
        },
        get isVip () {
            return userData.isVip;
        },
        set isVip (isVip) {
            userData.isVip = !!isVip;
        },
        get email () {
            return userData.email;
        },
        set email (email) {
            userData.email = email;
        }
    };
}()));
