(function() {

    window.Todo = {
        Models: {},
        Collections: {},
        Views: {},
        Router: {}
    };

    window.template = function (id) {
        return _.template($('#' + id).html());
    };

    Todo.Models.Person = Backbone.Model.extend({
        defaults: {
            name: 'Guest User',
            age: 23,
            occupation: 'Worker'
        },

        validate: function (attributes) {
            if (attributes.age < 0) {
                return 'Age must be positive.';
            }

            if (!attributes.name) {
                return 'Every person must have a name.';
            }
        }
    });

    Todo.Collections.People = Backbone.Collection.extend({
        model: Todo.Models.Person
    });

    Todo.Views.People = Backbone.View.extend({
        tagName: 'ul',

        initialize: function() {
          this.collection.on("add", this.addOne, this);
        },

        render: function () {
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function(person) {
            var personView = new Todo.Views.Person( {model: person});
            this.$el.append(personView.render().el);
        }
    });

    Todo.Views.Person = Backbone.View.extend({
        tagName: 'li',
        className: 'person',
        id: 'person-id',

        my_template: template('personTemplate'),

        initialize: function () {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        events: {
            "click .edit": "editPerson",
            "click .delete": "deletePerson"
        },

        editPerson: function() {
            var newName = prompt("Please enter the new name", this.model.get('name'));
            if (!newName) return;
            this.model.set('name', newName);
        },

        deletePerson: function() {
          this.model.destroy();
        },

        remove: function() {
            this.$el.remove();
        },

        render: function () {
            this.$el.html(this.my_template(this.model.toJSON()));
            return this;
        }

    });

    Todo.Views.AddPerson = Backbone.View.extend({
        el: '#addPerson',

        events: {
            'submit': 'submit'
        },

        submit: function(e) {
            e.preventDefault();
            var newPersonName = $(e.currentTarget).find('input[type=text]').val();
            var person = new Todo.Models.Person({ name: newPersonName});
            this.collection.add(person);
        }

    });

    var peopleCollection = new Todo.Collections.People([
        {
            name: 'Mohit Jain',
            age: 26
        },
        {
            name: 'Taroon Tyagi',
            age: 25,
            occupation: 'web designer'
        },
        {
            name: 'Rahul Narang',
            age: 26,
            occupation: 'Java Developer'
        }
    ]);

    var person = new Todo.Models.Person;
    var personView = new Todo.Views.Person({model: person});

    person.on('invalid', function (model, error) {
        console.log(error); // printing the error message on console.
    });

    var addPersonView = new Todo.Views.AddPerson({ collection: peopleCollection });
    var peopleView = new Todo.Views.People({collection: peopleCollection});
    $(document.body).append(peopleView.render().el);

})();




