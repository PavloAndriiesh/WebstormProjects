RAD.view("screen.search", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.search/screen.search.html',

    className: "screen scroll-view",

    onInitialize: function () {
        this.model = RAD.model('collection.searchedItems');
        this.loadObjectsFromLocalStorage();
    },

    events: {
        'tap #search-button': 'search',
        'tap .prev-search': 'searchWord'
    },

    search: function () {
        var word = document.getElementById("text").value;

        var self = this,
            options = {
                container_id: '#screen',
                content: "screen.home"
            };

        this.model.fetch({
            dataType: "jsonp",
            data: {
                country: "uk",
                pretty: "1",
                action: "search_listings",
                encoding: "json",
                listing_type: "buy",
                place_name: 'london'
            }
        }).then(function () {
            self.publish('navigation.show', options);
        });
    },

    searchWord: function(e) {
        var word = e.currentTarget.getAttribute('data-word');

        var self = this,
            options = {
                container_id: '#screen',
                content: "screen.home"
            };

        this.model.fetch({
            dataType: "jsonp",
            data: {
                country: "uk",
                pretty: "1",
                action: "search_listings",
                encoding: "json",
                listing_type: "buy",
                place_name: 'london',
                page: 1
            }
        }).then(function () {
            self.publish('navigation.show', options);
        });

        this.application.loadList(word);

    },

    loadList : function(word, firstStart) {

        if(firstStart) {
            app.currentFile = 0;
            var words = this.application.loadSearchedWords();

            if (words.length >= 20) {
                words.pop();
            }

            words.unshift({ "word": word, "resultItems": 123});

            app.saveSearchedWords(words);
        }

        app.currentFile++;

        var options = {
            container_id: '#screen',
            content: "screen.home",
            backstack: false
        };

        core.publish('navigation.show', options);

    },

    onItemClick: function (e) {
        var id = e.currentTarget.getAttribute('data-id');
        this.application.showDetails(id);
    },

    onloadNextClick: function() {
        this.application.loadList();
    },

    loadObjectsFromLocalStorage: function() {
        this.model.push(this.application.loadSearchedWords());
    }
/*

 onStartRender: function () {
 },
    onNewExtras: function (extras) {

    },
    onReceiveMsg: function (channel, data) {

    },
    onStartRender: function () {

    },

    onBeforeAttach: function(){

    },
    onStartAttach: function () {

    },
    onEndAttach: function () {

    },
    onEndDetach: function () {

    },
    onDestroy: function () {

    }
*/

}));