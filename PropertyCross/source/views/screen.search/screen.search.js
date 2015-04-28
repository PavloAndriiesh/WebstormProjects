RAD.view("screen.search", RAD.Blanks.View.extend({

    url: 'source/views/screen.search/screen.search.html',

    className: "screen scroll-view",

    onInitialize: function () {
        this.model = RAD.model('collection.phones');
    },

    onStartRender: function () {
        console.log("onStartRender screen home");
    }
/*

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