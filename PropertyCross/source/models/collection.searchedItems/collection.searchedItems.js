RAD.model('collection.searchedItems', Backbone.Collection.extend({
    url:'http://api.nestoria.co.uk/api',
    parse: function (response) {
        return response.response.listings;
    }
}), true);