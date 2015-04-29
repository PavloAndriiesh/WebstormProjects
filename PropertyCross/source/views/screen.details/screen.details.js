RAD.view("screen.details", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.details/screen.details.html',

    className: "screen scroll-view",


    onInitialize: function () {
        this.model  = new RAD.model('model.itemDetail');
    },

    onNewExtras: function (_id) {
        this.model.set(RAD.model('collection.phones').findWhere({id:_id}).toJSON());
    },

    onStartRender: function () {
        console.log("screen.details rendered!");
    },

    events: {
        'tap .back-to-list' : 'backToList'
    },

    backToList: function (e) {
        console.log(e);
        this.publish('router.back', null);
    }

/*

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