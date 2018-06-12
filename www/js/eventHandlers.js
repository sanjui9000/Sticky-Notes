(function (window) {
    "use strict";
    var App = window.App || {};
    var Notes = App.Notes;
    var ToastMessages = App.ToastMessages;
    var UpdateView = App.UpdateView;
    var Users = App.Users;
    var Validations = App.Validations;
    var validation = new Validations();

    function EventHandlers() {

    }

    // Event to handle what happens when we click on create note icon
    EventHandlers.prototype.onCreateNoteClick = function () {
        document.getElementById('add-note').addEventListener('click', function () {
            var html = "<div class=\"modal-container\">\n" +
                "    <section class=\"create-modal\">\n" +
                "        <div class=\"form-group title\">\n" +
                "            <label class=\"sr-only\">Title</label>\n" +
                "            <input id='titleText' type=\"text\" placeholder=\"Title...\" class=\"form-control\">\n" +
                "        </div>\n" +
                "        <div class=\"form-group\">\n" +
                "            <label class=\"sr-only\">Content</label>\n" +
                "            <textarea id='contentText' type=\"text\" placeholder=\"Content...\" class=\"form-control\"></textarea>\n" +
                "        </div>\n" +
                "        <div class=\"form-group action-btn\">\n" +
                "            <button class=\"btn btn-primary \" id='cancel-button'>Cancel</button>\n" +
                "            <button class=\"btn btn-primary\" id='save-button'>Save</button>\n" +
                "        </div>\n" +
                "    </section>\n" +
                "</div>";

            document.getElementById('modal-container').innerHTML = html;

            EventHandlers.prototype.onCancelNoteClick();
            EventHandlers.prototype.onSaveNoteClick();
        });
    };

    // Event to handle what happens when we click on cance button inside any modal
    EventHandlers.prototype.onCancelNoteClick = function () {
        document.getElementById('cancel-button').addEventListener('click', function () {
            document.getElementById('modal-container').innerHTML = "";
        });
    };

    // Event to handle what happens when we click on save note button
    EventHandlers.prototype.onSaveNoteClick = function () {
        document.getElementById('save-button').addEventListener('click', function () {
            var titleText = document.getElementById('titleText').value;
            var contentText = document.getElementById('contentText').value;
            var note = new Notes(titleText, contentText);
            if (!note.title || !note.content) {
                return;
            } else {
                var toast = new ToastMessages('Dummy'); // Just for filling up the constructor - Doesn't have any use
                toast.removeMessage();
                note.addNote();
                document.getElementById('modal-container').innerHTML = '';
                var updateView = new UpdateView();
                updateView.refreshNotesDiv();
            }
        });
    };

    // Event to handle what happens when we click on signup button on navbar
    EventHandlers.prototype.onSignupClick = function () {
        document.getElementById('signup').addEventListener('click', function () {
            var html = "<div class=\"modal-container\">\n" +
                "    <section class=\"create-modal\">\n" +
                "        <div class=\"form-group title\">\n" +
                "            <label class=\"sr-only\">Title</label>\n" +
                "            <input type=\"text\" placeholder=\"Signup\" class=\"form-control s-form-control\">\n" +
                "        </div>\n" +
                "        <div class=\"form-group\">\n" +
                "            <label class=\"sr-only\">Username</label>\n" +
                "            <input id='username' type=\"text\" placeholder=\"Username\" class=\"form-control s-border\">\n" +
                "        </div>\n" +
                "        <div class=\"form-group\">\n" +
                "            <label class=\"sr-only\">Email</label>\n" +
                "            <input id='email' type=\"email\" placeholder=\"Email\" class=\"form-control s-border\">\n" +
                "        </div>\n" +
                "        <div class=\"form-group\">\n" +
                "            <label class=\"sr-only\">Password</label>\n" +
                "            <input id='password' type=\"password\" placeholder=\"Password\" class=\"form-control s-border\">\n" +
                "        </div>\n" +
                "        <div class=\"form-group action-btn\">\n" +
                "            <button class=\"btn btn-primary \" id='cancel-button'>Cancel</button>\n" +
                "            <button class=\"btn btn-primary\" id='signup-button'>Signup</button>\n" +
                "        </div>\n" +
                "    </section>\n" +
                "</div>";

            document.getElementById('modal-container').innerHTML = html;

            EventHandlers.prototype.onCancelNoteClick();
            EventHandlers.prototype.onSignupSubmitClick();
        });
    };

    // Event to handle what happens when we submit signup form
    EventHandlers.prototype.onSignupSubmitClick = function () {
        document.getElementById('signup-button').addEventListener('click', function () {
            var username = document.getElementById('username').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            if (!username || !email || !password) {
                var toastMessage = new ToastMessages('All the fields are mandatory. Please enter valid values.');
                toastMessage.displayMessage(4800);
            } else {
                if (!validation.checkUsername(username)) {
                    var toastMessage = new ToastMessages('Username should be at least 8 characters with 1 digit.');
                    toastMessage.displayMessage(4800);
                    return;
                }
                if (!validation.checkEmail(email)) {
                    var toastMessage = new ToastMessages('Email address is not an authorized email address.');
                    toastMessage.displayMessage(4800);
                    return;
                }
                if (!validation.checkPassword(password)) {
                    var toastMessage = new ToastMessages('Password should contain at least 8 characters with atleast 1 numeric character, 1 lowercase letter, 1 uppercase letter & 1 special character.');
                    toastMessage.displayMessage(4800);
                    return;
                }

                var user = new Users(username, email, password);
                user.addUser();
            }
        });
    };

    // Event to handle what happens when we click on login button on navbar
    EventHandlers.prototype.onLoginClick = function () {
        document.getElementById('login').addEventListener('click', function () {
            var html = "<div class=\"modal-container\">\n" +
                "    <section class=\"create-modal\">\n" +
                "        <div class=\"form-group title\">\n" +
                "            <label class=\"sr-only\">Title</label>\n" +
                "            <input type=\"text\" placeholder=\"Login\" class=\"form-control s-form-control\">\n" +
                "        </div>\n" +
                "        <div class=\"form-group\">\n" +
                "            <label class=\"sr-only\">Email</label>\n" +
                "            <input id='loginemail' type=\"email\" placeholder=\"Email\" class=\"form-control s-border\">\n" +
                "        </div>\n" +
                "        <div class=\"form-group\">\n" +
                "            <label class=\"sr-only\">Password</label>\n" +
                "            <input id='loginpassword' type=\"password\" placeholder=\"Password\" class=\"form-control s-border\">\n" +
                "        </div>\n" +
                "        <div class=\"form-group action-btn\">\n" +
                "            <button class=\"btn btn-primary \" id='cancel-button'>Cancel</button>\n" +
                "            <button class=\"btn btn-primary\" id='login-button'>Login</button>\n" +
                "        </div>\n" +
                "    </section>\n" +
                "</div>";

            document.getElementById('modal-container').innerHTML = html;

            EventHandlers.prototype.onCancelNoteClick();
            EventHandlers.prototype.onLoginSubmitClick();
        });
    };

    // Event to handle what happens when we submit login form
    EventHandlers.prototype.onLoginSubmitClick = function () {
        document.getElementById('login-button').addEventListener('click', function () {
            var email = document.getElementById('loginemail').value;
            var password = document.getElementById('loginpassword').value;
            if (!email || !password) {
                var toastMessage = new ToastMessages('All the fields are mandatory. Please enter valid values.');
                toastMessage.displayMessage(4800);
            } else {
                if (!localStorage.getItem('users')) {
                    var toastMessage = new ToastMessages('You need to signup before using this account');
                    toastMessage.displayMessage(4800);
                } else {
                    var arr = JSON.parse(localStorage.getItem('users'));
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].email == email) {
                            if (arr[i].password == password) {
                                localStorage.setItem('isLoggedIn', arr[i].userid);
                                var toastMessage = new ToastMessages('You have logged in successfully.');
                                toastMessage.displayMessage(4800);
                                var authenticated = new App.Authentication();
                                authenticated.isAuthenticated();
                                document.getElementById('modal-container').innerHTML = '';
                                var updateView = new UpdateView();
                                updateView.refreshNotesDiv();
                                return;
                            } else {
                                var toastMessage = new ToastMessages('Password do not match. Please try again');
                                toastMessage.displayMessage(4800);
                                return;
                            }
                        }
                    }
                    var toastMessage = new ToastMessages('You do not have an account yet. Please sign up to use the application.');
                    toastMessage.displayMessage(4800);
                }
            }
        });
    };

    // Event to handle what happens when we click on logout button
    EventHandlers.prototype.onLogoutClick = function () {
        document.getElementById('logout').addEventListener('click', function () {
            localStorage.removeItem('isLoggedIn');
            var authenticated = new App.Authentication();
            authenticated.isAuthenticated();
            var toastMessage = new ToastMessages('You have logged out successfully.');
            toastMessage.displayMessage(4800);
        });
    };

    App.EventHandlers = EventHandlers;
    window.App = App;

})(window);
