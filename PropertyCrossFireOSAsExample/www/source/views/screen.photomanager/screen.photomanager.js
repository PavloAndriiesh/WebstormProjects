RAD.view("screen.photomanager", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.photomanager/screen.photomanager.html',


    onInitialize: function () {
        this.model = RAD.model('collection.photos');
        this.loadImages();
        this.showPhotos();
    },

    events: {
        'tap .choose-from-gallery': "chooseFromGallery",
        'tap .take-a-photo': "takeAPhoto",
        'tap .show-photos': "showPhotos",
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
        console.log(cordova.file.externalApplicationStorageDirectory);
        console.log(cordova.file.externalDataDirectory);
        console.log(cordova.file.externalCacheDirectory);
    },


    takeAPhoto: function() {
        var that = this;
        console.log("making a photo");

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI
        });

        function onSuccess(imageURI) {
            console.log("success, url: " + imageURI);
            that.model.unshift({ "URL" : imageURI });
        }

        function onFail(message) {
            console.log("fail because: " + message);
        }
    },

    chooseFromGallery: function() {
        var that = this;
        console.log("choosing a photo");

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });

        function onSuccess(imageURI) {
            console.log("success, url: " + imageURI);
            that.model.unshift({ "URL" : imageURI });
        }

        function onFail(message) {
            console.log("fail because: " + message);
        }
    },

    showPhotos: function() {
        var that = this;

        window.resolveLocalFileSystemURL("file:///storage/emulated/0/Android/data/com.mobidev.pavlo/cache", onResolveSuccess, fail);

        function onResolveSuccess(fileEntry) {
            console.log(fileEntry.name);
            console.log(fileEntry.fullPath);
            console.log(fileEntry.toURL());
            console.log(fileEntry.isFile);
            console.log(fileEntry.isDirectory);

            var directoryReader = fileEntry.createReader();
            directoryReader.readEntries(addImages, fail);
        }

        function fail(e) {

            var msg = '';

            switch (e.code) {
                case FileError.QUOTA_EXCEEDED_ERR:
                    msg = 'QUOTA_EXCEEDED_ERR';
                    break;
                case FileError.NOT_FOUND_ERR:
                    msg = 'NOT_FOUND_ERR';
                    break;
                case FileError.SECURITY_ERR:
                    msg = 'SECURITY_ERR';
                    break;
                case FileError.INVALID_MODIFICATION_ERR:
                    msg = 'INVALID_MODIFICATION_ERR';
                    break;
                case FileError.INVALID_STATE_ERR:
                    msg = 'INVALID_STATE_ERR';
                    break;
                default:
                    msg = 'Unknown Error';
                    break;
            }

            console.log('Error: ' + msg);
        }


        function addImages(images) {
            for (var i=0; i<images.length; i++) {
                that.model.unshift({ "URL" : images[i].toURL() });
                console.log('added URL to model: ' + images[i].toURL());
            }
        }
    }

}));