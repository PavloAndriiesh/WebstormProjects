RAD.model('collection.searchedItems', Backbone.Collection.extend({
    url:'http://api.nestoria.co.uk/api',
    parse: function (response) {

        this.total_pages = response.response.total_pages;

        return response.response.listings;
    }
}), true);