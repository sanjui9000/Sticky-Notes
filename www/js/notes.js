(function (window) {
    "use strict";
    var App = window.App || {};
    var ToastMessages = App.ToastMessages;
    var LocalDataStore = App.LocalDataStore;

    function Notes(title, content) {
        if (!title || !content) {
            var toastMessage = new ToastMessages('Title or content of a note cannot be empty.');
            toastMessage.displayMessage(4800);
            return;
        }
        this.title = title;
        this.content = content;
    }

    Notes.prototype.addNote = function () {
        var localdatastore = new LocalDataStore();
        localdatastore.create(this.title, this.content);
    };

    App.Notes = Notes;
    window.App = App;

})(window);
