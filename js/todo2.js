(function() {
    window.Todo = {
        Models : {},
        Views : {},
        Routers : {},
        Collections : {}
    };

    window.template = function (id) {
        return _.template($('#' + id).html());
    };

    Todo.Models.Task = Backbone.Model.extend({
        defaults: {
            description: "Some thing to do",
            time: new Date()
        },

        validate: function(attrs) {
            if (!attrs.description) {
                return "Task should have description";
            }
        }
    });

    Todo.Views.Task = Backbone.View.extend({
        className: "task",

        taskTemplate: template('taskTemplate'),

        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        events: {
            "click": "changeActiveness",
            "click .edit": "editTask",
            "click .delete": "deleteTask"
        },

        render: function() {
            this.$el.html(this.taskTemplate(this.model.toJSON()));
            return this;
        },

        changeActiveness: function() {
            if (this.$el.hasClass("changeActiveness")) {
                this.$el.removeClass("changeActiveness");
            } else {
                this.$el.addClass("changeActiveness");
            }

            return this.render();
        },

        editTask: function() {
            var newDescription = prompt("Please enter new description", this.model.get('description'));
            if (!newDescription) return;
            this.model.set('description', newDescription);
            this.changeActiveness();
        },

        deleteTask: function() {
            this.model.destroy();
        },

        remove: function() {
            this.$el.remove();
        }

    });

    Todo.Views.ListOfTasks = Backbone.View.extend({

        initialize: function () {
            this.collection.on("add", this.addTask, this);
        },

        render: function() {
            this.collection.each(this.addTask, this);
            return this;
        },

        addTask: function(task) {
            var taskView = new Todo.Views.Task({ model: task });
            this.$el.append(taskView.render().el);
        }

    });

    Todo.Collections.ListOfTasks = Backbone.Collection.extend({
        model: Todo.Models.Task
    });

    Todo.Views.AddTaskView = Backbone.View.extend({
        el: '#addTask',

        events: {
            'submit': 'submit'
        },

        submit: function(e) {
            e.preventDefault();
            var newTaskDescription = document.getElementById("text").value;
            if (!newTaskDescription) return;

            document.getElementById("text").value = "";
            var task = new Todo.Models.Task({ description: newTaskDescription});
            this.collection.add(task);
        }
    });

    var listOfTasksCollection = new Todo.Collections.ListOfTasks([
        {
            description: "Get up"
        },
        {
            description: "Survive"
        },
        {
            description: "Go back to bed"
        }
    ]);

    var addTaskView = new Todo.Views.AddTaskView({ collection: listOfTasksCollection});
    var tasksView = new Todo.Views.ListOfTasks({ collection: listOfTasksCollection});
    $(".list-of-tasks").append(tasksView.render().el);

}());
























