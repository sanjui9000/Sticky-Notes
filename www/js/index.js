(function (window) {
    'use strict';
    var App = window.App;

    // Check authentication and accordingly display elements
    var Authentication = App.Authentication;
    var auth = new Authentication();
    auth.isAuthenticated();

})(window);