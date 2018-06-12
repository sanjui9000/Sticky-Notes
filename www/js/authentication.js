(function (window) {
    "use strict";
    var App = window.App || {};
    var ToastMessages = App.ToastMessages;
    var EventHandlers = App.EventHandlers;
    var eventHandler = new EventHandlers();
    var updateView = new App.UpdateView;

    function Authentication() {
    }

    // This method checks if user is authenticated or no and modifies DOM based on that
    Authentication.prototype.isAuthenticated = function () {
        if (!localStorage.getItem('isLoggedIn')) {
            document.getElementById('mainContainer').innerHTML = '';
            document.getElementById('mainContainer').innerHTML = '<div class="bannerText"><h1>Welcome to Our Sticky Notes Application</h1><h3>Here is where things get organized</h3><h2>Signup to get started</h2></div>';

            document.getElementById('navbar').innerHTML = '';
            document.getElementById('navbar').innerHTML = '<a class="logo">Sticky Notes</a><a id="login" >Login</a><a id="signup">Signup</a>';
            eventHandler.onSignupClick();
            eventHandler.onLoginClick();
        } else {
            document.getElementById('mainContainer').innerHTML = '';
            document.getElementById('mainContainer').innerHTML = '<li class="create-note"><a href="#" id="add-note">+ Create a note</a></li><ul id="notesList"></ul>';
            eventHandler.onCreateNoteClick();
            document.getElementById('navbar').innerHTML = '';
            document.getElementById('navbar').innerHTML = '<a class="logo">Sticky Notes</a><a id="logout">Logout</a>';
            eventHandler.onLogoutClick();
            updateView.refreshNotesDiv();
        }
    };

    App.Authentication = Authentication;
    window.App = App;

})(window);
