(function () {

    var list = document.getElementById('list-of-tasks'),
        listOfTasks= ["Get up", "Survive", "Go back to bad"];


    var toDo = {
        i: 0,

        addTask: function (task,parent) {

            if (!task) return;
            if (task === "What needs to be done?") return;

            document.getElementById("text").value = "";

            this.i++;

            var taskWrapper = document.createElement("div");
            taskWrapper.id = "taskWrapper" + this.i;

            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.id = "task" + this.i;

            var label = document.createElement('label');
            label.className = "tasks btn-block";
            label.htmlFor = "task" + this.i;
            label.appendChild(document.createTextNode(task));

            taskWrapper.appendChild(checkbox);
            taskWrapper.appendChild(label);

            parent.appendChild(taskWrapper);
        },

        init: function (tasks, parent) {

            for (var i=0; i<tasks.length; i++) {
                toDo.addTask(tasks[i], parent);
            }
        }
    };

    toDo.init(listOfTasks, list);

    document.getElementById("text").addEventListener('keydown', keyHandler, false);
    document.getElementById("button").addEventListener("click",  function() {
        toDo.addTask(document.getElementById("text").value, list);
        document.getElementById("text").value = "What needs to be done?";
    });

    function keyHandler(event) {

        var KEY_CODE = {
            SPACE: 32,
            ENTER: 13
        };

        switch(event.keyCode) {
            case KEY_CODE.ENTER:
                toDo.addTask(event.target.value, list);
                break;
        }
    }

}());





