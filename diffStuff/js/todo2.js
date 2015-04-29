jQuery(function () {
    window.Todo = {
        Models: {},
        Views: {},
        Routers: {},
        Collections: {},
        Localstorage: {}
    };

    window.template = function (id) {
        return _.template($('#' + id).html());
    };

    Todo.Models.Task = Backbone.Model.extend({
        defaults: {
            description: "Some thing to do",
            active: true
        },

        validate: function (attrs) {
            if (!attrs.description || attrs.description.length) {
                return "Task should have description";
            }
        }
    });

    Todo.Views.Task = Backbone.View.extend({
        className: "task fading",

        taskTemplate: template('taskTemplate'),

        initialize: function () {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
            var element = this.$el;

            if (!this.model.get("active")) {
                element.addClass("changeActiveness");
            }

            setTimeout(function () {
               element.toggleClass("unfading");
            }, 0);

            setTimeout(function () {
                element.toggleClass("unfading");
                element.toggleClass("fading");
            }, 0);
        },

        events: {
            "click": "changeActiveness",
            "click .edit": "editTask",
            "click .delete": "deleteTask"
        },

        render: function () {
            this.$el.html(this.taskTemplate(this.model.toJSON()));
            Todo.Localstorage.saveSearchedWords();
            return this;
        },

        changeActiveness: function () {
            if (this.$el.hasClass("changeActiveness")) {
                this.$el.removeClass("changeActiveness");
                this.model.set("active", true);
            } else {
                this.$el.addClass("changeActiveness");
                this.model.set("active", false);
            }

            return this.render();
        },

        editTask: function () {
            var newDescription = prompt("Please enter new description", this.model.get('description'));
            if (!newDescription || !newDescription.trim()) {
                this.changeActiveness();
                return;
            }
            this.model.set('description', newDescription);
            this.changeActiveness();
        },

        deleteTask: function () {
            var element = this.$el;

            element.toggleClass("deleteTaskAnimationBegin");

            setTimeout(function () {
                element.toggleClass("deleteTaskAnimationEnd");
            }, 0);


            this.model.destroy();
            Todo.Localstorage.saveSearchedWords();
        },

        remove: function () {
            this.changeActiveness();
            var el = this.$el;

            setTimeout(function () {
                el.remove();
            }, 1000);
        }

    });

    Todo.Views.TasksCollection = Backbone.View.extend({

        initialize: function () {
            this.collection.on("add", this.addTask, this);
        },

        events: {
            'click': 'click'
        },

        click: function (e) {
            console.log(e.target)
        },

        render: function () {
            this.collection.each(this.addTask, this);
            return this;
        },

        addTask: function (task) {
            var taskView = new Todo.Views.Task({model: task});
            this.$el.append(taskView.render().el);
        }

    });

    Todo.Collections.TasksCollection = Backbone.Collection.extend({
        model: Todo.Models.Task
    });

    Todo.Views.InputView = Backbone.View.extend({
        el: '#input',

        events: {
            'submit': 'submit'
        },

        submit: function (event) {
            event.preventDefault();
            var newTaskDescription = document.getElementById("text").value;
            if (!newTaskDescription || !newTaskDescription.trim()) {
                return;
            }

            document.getElementById("text").value = "";
            var task = new Todo.Models.Task({description: newTaskDescription});
            this.collection.add(task);
            Todo.Localstorage.saveSearchedWords();
        }
    });


    // LocalStorage

    Todo.Localstorage.saveSearchedWords = function () {
        if (!Todo.Localstorage.supportsLocalStorage()) {
            return false;
        }
        window.localStorage.setItem("tasksCollection", JSON.stringify(tasksCollection));
    };

    Todo.Localstorage.loadTasks = function () {
        try {
            console.log(JSON.parse(window.localStorage.getItem("tasksCollection")))
        } catch (err) {
            $("h1").html("A[neyu! Cработала защита!");
            window.localStorage.setItem("tasksCollection",JSON.stringify([
                    {"description": "научиться не клацать где не надо", "active":true},
            ]));

        }

        if (!Todo.Localstorage.supportsLocalStorage()) {
            return false;
        }
        return JSON.parse(window.localStorage.getItem("tasksCollection"));
    };

    Todo.Localstorage.supportsLocalStorage = function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

    var tasksCollection = new Todo.Collections.TasksCollection(Todo.Localstorage.loadTasks());
    var inputView = new Todo.Views.InputView({collection: tasksCollection});
    var tasksView = new Todo.Views.TasksCollection({collection: tasksCollection});
    $(".list-of-tasks").append(tasksView.render().el);

});