function Notification(options) {
    var self = this;
    //DOM nodes
    var div = document.createElement('div');
    var parentElem = document.body;
    div.style.display = "block";
    div.style.width = "200px";
    div.style.background = "orange";
    div.style.position = "absolute";

    //Local variables
var counter = 1;
    //Methods

    parentElem.appendChild(div);
    // or
    // parentElem.insertBefore(div, parentElem.children[1]);
    // parentElem.insertBefore(div, null);

    div.style.top = options.top + "px";
    div.style.right = options.right + "px";

    div.classList.add("notification");

    this.addClassActive = function () {
        div.classList.add("active");
        div.innerHTML = options.html + counter + " раз";
        counter++;
    };
    this.removeClassActive = function () {
        div.classList.remove("active");
    };
    setInterval(function () {
        self.addClassActive();
        setTimeout(function () {
            self.removeClassActive();
        }, 1500)
    }, 3000);

}

