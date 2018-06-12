(function (window) {
    "use strict";
    var App = window.App || {};

    function Validations() {
    }

    // Validate username
    Validations.prototype.checkUsername = function(username) {
        var re = /^(?=.*\d).{8,}$/;
        return re.test(String(username).toLowerCase());
    };

    // Validate email
    Validations.prototype.checkEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Validate password
    Validations.prototype.checkPassword = function (password) {
        var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        return re.test(String(password));
    };

    App.Validations = Validations;
    window.App = App;

})(window);
