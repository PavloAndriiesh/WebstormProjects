RAD.view("screen.photomanager", RAD.Blanks.View.extend({

    url: 'source/views/screen.photomanager/screen.photomanager.html',


    onInitialize: function () {
        this.loadImages();
    },

    events: {
        'tap .take-a-photo': "takeAPhoto",
        'tap .check-connection': 'checkConnection'
    },

    checkConnection: function() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        alert('Connection type: ' + states[networkState]);
    },

    loadImages: function() {
      console.log("images loaded");
    },

    takeAPhoto: function() {
        console.log("making a photo");

        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.FILE_URI });

        function onSuccess(imageURI) {
            var image = document.getElementById('myImage');
            image.src = imageURI;
            console.log("success, url: " + imageURI);
            alert("success, url: " + imageURI);
        }

        function onFail(message) {
            console.log("fail");
            alert('Failed because: ' + message);
        }
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