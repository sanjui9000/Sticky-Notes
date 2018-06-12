(function (window) {
    'use strict';
    var App = window.App || {};
    var UpdateView = App.UpdateView;

    function LocalDataStore() {

    }

    // Array to store all the sticky notes
    var notesArray = [];

    // Gets the latest data from local storage and refreshes DOM
    LocalDataStore.prototype.get = function () {
        var updateView = new UpdateView();
        if (localStorage.getItem('StickyNotes')) {
            notesArray = JSON.parse(localStorage.getItem('StickyNotes'));
            updateView.refreshNotesDiv();
        } else {
            updateView.refreshNotesDiv();
        }
    };

    // Creates new note
    LocalDataStore.prototype.create = function (title, content) {
        LocalDataStore.prototype.get();
        var obj = {
            'user': localStorage.getItem('isLoggedIn'),
            'id': +new Date(),
            'title': title,
            'content': content
        };
        notesArray.push(obj);
        localStorage.setItem('StickyNotes', JSON.stringify(notesArray));
        var updateView = new UpdateView();
        updateView.refreshNotesDiv();
    };

    // Updates existing note
    LocalDataStore.prototype.update = function (id, title, content) {
        LocalDataStore.prototype.get();
        var data = JSON.parse(localStorage.getItem('StickyNotes'));
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                data[i].title = title;
                data[i].content = content;
            } else {
                continue;
            }
        }

        setTimeout(function () {
            localStorage.setItem('StickyNotes', JSON.stringify(data));
        }, 10);

        setTimeout(function () {
            var updateView = new UpdateView();
            updateView.refreshNotesDiv();
            var ctxMenu = document.getElementById("ctxMenu");
            ctxMenu.style.display = "";
            ctxMenu.style.left = "";
            ctxMenu.style.top = "";
            document.getElementById('modal-container').innerHTML = "";
        }, 20)
    };

    // Delete existing notes
    LocalDataStore.prototype.delete = function (id) {
        LocalDataStore.prototype.get();
        var data = JSON.parse(localStorage.getItem('StickyNotes'));
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                data.splice(i, 1);
            } else {
                continue;
            }
        }

        setTimeout(function () {
            localStorage.setItem('StickyNotes', JSON.stringify(data));
        }, 10);

        setTimeout(function () {
            var updateView = new UpdateView();
            updateView.refreshNotesDiv();
            var ctxMenu = document.getElementById("ctxMenu");
            ctxMenu.style.display = "";
            ctxMenu.style.left = "";
            ctxMenu.style.top = "";
        }, 20)
    };

    App.LocalDataStore = LocalDataStore;
    window.App = App;

})(window);
