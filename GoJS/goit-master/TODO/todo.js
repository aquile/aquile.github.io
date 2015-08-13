(function() {
    function ToDo() {
        var storage = new Storage(),
            model = new Model(storage),
            template = new Template(),
            view = new View(model, template),
            controller = new Controller(model, view);

        view.init();
        controller.init();

        return controller;
    }

    function Item(text) {}

    function Model(storage) {}

    function View(model, template) {
        return {
            init: function() {

            }
        }
    }

    function Controller(model, view) {
        return {
            init: function() {

            }
        }
    }

    function Template() {}

    function Storage() {}

    window.ToDo = ToDo;
})();
