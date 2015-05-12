RAD.view("screen.info", RAD.Blanks.View.extend({

    url: 'source/views/screen.info/screen.info.html',

    events: {
        'tap .info-enjoy': 'close',
        'tap .photo-manager': "photoManager"
    },

    close: function() {
        this.publish('navigation.dialog.close', {content: "screen.info"});
    },

    photoManager: function() {
        var options = {
            container_id: '#screen',
            content: "screen.photomanager",
            backstack: true
        };

        this.publish('navigation.dialog.close', {content: "screen.info"});
        this.publish('navigation.show', options);
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