RAD.view("screen.home", RAD.Blanks.ScrollableView.extend({

    className: "screen",

    url: 'source/views/screen.home/screen.home.html',

    onInitialize: function () {
        this.model = RAD.model('collection.phones');
    },

    onStartRender: function () {
        console.log("onStartRender screen home");
    },

    /// <-- START event tracking
    events: {
        'tap .screen-home-list-item' : 'onItemClick',
        'tap .back-button' : 'onloadNextClick'

    },
    /// <-- END event tracking

    onItemClick: function (e) {
        var id = e.currentTarget.getAttribute('data-id');
        this.application.showDetails(id);
    },

    onloadNextClick: function (e) {
        this.application.loadList();
        this.$(".back-button").css("visibility", "hidden");
    }




    /*
     onNewExtras: function () {

     },
     onReceiveMsg: function (channel, data) {

     },
     onStartRender: function () {

     },
     onEndRender: function () {

     },
     onBeforeAttach: function () {

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