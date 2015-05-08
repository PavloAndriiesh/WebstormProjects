RAD.view("screen.info", RAD.Blanks.View.extend({

    url: 'source/views/screen.info/screen.info.html',

    events: {
        'tap .info-enjoy': 'close',
        'tap .take-a-photo-button': "takeAPhoto"
    },

    close: function() {
        this.publish('navigation.dialog.close', {content: "screen.info"});
    },

    takeAPhoto: function() {
        console.log("making a photo");
        console.log(device.cordova);
        alert("devicereade")
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