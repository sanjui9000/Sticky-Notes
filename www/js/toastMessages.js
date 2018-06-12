(function (window) {
    "use strict";
    var App = window.App || {};
    var x = document.getElementById('snackbar');

    function ToastMessages(message) {
        if (!message) {
            throw new Error('No message supplied.');
        }
        this.message = message;
    }

    // Function to display message
    ToastMessages.prototype.displayMessage = function (timeout) {
        x.className = x.className.replace("show", "");

        setTimeout(function() {
            x.innerHTML = this.message;
            x.className = "";
            x.className = "show";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, timeout);
        }.bind(this),1);

    };

    // Function to remove message
    ToastMessages.prototype.removeMessage = function () {
        x.className = x.className.replace("show", "");
    };

    App.ToastMessages = ToastMessages;
    window.App = App;

})(window);
