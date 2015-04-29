RAD.view("screen.home", RAD.Blanks.ScrollableView.extend({

    className: "screen scroll-view",

    url: 'source/views/screen.home/screen.home.html',

    onInitialize: function() {
        this.model = RAD.model('collection.searchedItems');
    },

    events: {
        'tap .screen-home-list-item': 'onItemClick',
        'tap .back-button': 'onBackButton',
        'tap .show-more-button': 'showMore'
    },

    onItemClick: function (e) {
        var id = e.currentTarget.getAttribute('data-id');
        this.application.showDetails(id);
    },

    onBackButton: function() {
        this.model.set(length, 0);
        this.application.searchPage();
    },

    showMore: function() {
        console.log(this.model.length);
        this.application.loadList();
    },

    search: function () {
        var options = {
                container_id: '#screen',
                content: "screen.home"
            };

        this.publish('navigation.show', options);

    }

/*

 onStartRender: function () {
 },

    onInitialize: function () {

    },
    onNewExtras: function (extras) {

    },
    onReceiveMsg: function (channel, data) {

    },
    onStartRender: function () {

    },
    onEndRender: function () {

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