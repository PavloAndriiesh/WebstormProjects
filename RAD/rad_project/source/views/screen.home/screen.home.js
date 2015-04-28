RAD.view("screen.home", RAD.Blanks.ScrollableView.extend({

    className: "screen scroll-view",

    url: 'source/views/screen.home/screen.home.html',

    onInitialize: function() {
        this.model = RAD.model('collection.phones');
    },

    onStartRender: function () {
        console.log("onStartRender screen home");
    },

    events: {
        'tap .screen-home-list-item': 'onItemClick',
        'tap .back-button': 'onloadNextClick'
    },

    onItemClick: function (e) {
        console.log("inside onItemClick");
        var id = e.currentTarget.getAttribute('data-id');
        this.application.showDetails(id);
    },

    onloadNextClick: function() {
        this.application.loadList();
    }

/*
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