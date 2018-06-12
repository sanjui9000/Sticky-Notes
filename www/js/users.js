(function (window) {
    "use strict";
    var App = window.App || {};
    var ToastMessages = App.ToastMessages;

    function Users(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    Users.prototype.addUser = function () {
        if (!localStorage.getItem('users')) {
            var arr = [{
                'userid': +new Date(),
                'username': this.username,
                'email': this.email,
                'password': this.password
            }];
            localStorage.setItem('users', JSON.stringify(arr));
        } else {
            var ar = JSON.parse(localStorage.getItem('users'));
            ar.push({
                'userid': +new Date(),
                'username': this.username,
                'email': this.email,
                'password': this.password
            });
            localStorage.setItem('users', JSON.stringify(ar));
        }

        document.getElementById('modal-container').innerHTML = '';

        var toastMessage = new ToastMessages('You have signed up successfully. Please login to add notes.');
        toastMessage.displayMessage(4800);
    };

    App.Users = Users;
    window.App = App;

})(window);
