RAD.service("service.json_loader", RAD.Blanks.Service.extend({

    _getJson: function(file, callback) {
        var that = this;

        $.getJSON(file, function(json) {
            if (typeof callback === "function") {
                callback(json);
            }
        }).done(function() {
            // try to hide loader anyway
            that.publish('navigation.dialog.close', {content: 'screen.loader'});
        });
    },

    onReceiveMsg: function (channel, data) {
        var parts = channel.split('.'),
            command = parts[parts.length - 1];

        switch(command) {
            case 'get':
                if (data.loader) {
                    // show loader popup if we need it
                    this.publish('navigation.dialog.show', {content: 'screen.loader'});
                }
                this._getJson(data.file, data.callback);
                break;
        }
    }
}));