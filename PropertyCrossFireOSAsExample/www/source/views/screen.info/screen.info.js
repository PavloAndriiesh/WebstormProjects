RAD.view("screen.info", RAD.Blanks.View.extend({

    url: 'source/views/screen.info/screen.info.html',

    events: {
        'tap .info-enjoy': 'close'
    },

    close: function() {
        this.publish('navigation.dialog.close', {content: "screen.info"});
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