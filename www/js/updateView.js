(function (window) {
    "use strict";
    var App = window.App || {};
    var mostUpdatedNotes = [];
    var dragSrcEl = null;

    function UpdateView() {
        if (localStorage.getItem('StickyNotes')) {
            mostUpdatedNotes = JSON.parse(localStorage.getItem('StickyNotes'));
        }
    }

    /* Drag & Drop Stuff */

    UpdateView.prototype.handleDragStart = function (e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);
        this.classList.add('dragElem');
    };

    UpdateView.prototype.handleDragEnter = function (e) {
        // this / e.target is the current hover target.
    };

    UpdateView.prototype.handleDragOver = function (e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        this.classList.add('over');
        e.dataTransfer.dropEffect = 'move';
        return false;
    };

    UpdateView.prototype.handleDragLeave = function (e) {
        this.classList.remove('over');  // this / e.target is previous target element.
    };

    UpdateView.prototype.addDnDHandlers = function (elem) {
        elem.addEventListener('dragstart', UpdateView.prototype.handleDragStart, false);
        elem.addEventListener('dragenter', UpdateView.prototype.handleDragEnter, false);
        elem.addEventListener('dragover', UpdateView.prototype.handleDragOver, false);
        elem.addEventListener('dragleave', UpdateView.prototype.handleDragLeave, false);
        elem.addEventListener('drop', UpdateView.prototype.handleDrop, false);
        elem.addEventListener('dragend', UpdateView.prototype.handleDragEnd, false);
    };

    UpdateView.prototype.handleDrop = function (e) {
        // this/e.target is current target element.

        if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
        }

        // Don't do anything if dropping the same column we're dragging.
        if (dragSrcEl != this) {
            // Set the source column's HTML to the HTML of the column we dropped on.
            //alert(this.outerHTML);
            //dragSrcEl.innerHTML = this.innerHTML;
            //this.innerHTML = e.dataTransfer.getData('text/html');
            this.parentNode.removeChild(dragSrcEl);
            var dropHTML = e.dataTransfer.getData('text/html');
            this.insertAdjacentHTML('beforebegin', dropHTML);
            var dropElem = this.previousSibling;
            UpdateView.prototype.addDnDHandlers(dropElem);
            var updatedNodelist = document.getElementById('notesList').childNodes;
            var arr = [];
            for (var i = 0; i < updatedNodelist.length; i++) {
                arr.push(updatedNodelist[i].id);
            }
            setTimeout(function () {
                var currArr = JSON.parse(localStorage.getItem('StickyNotes'));
                var tempArr = [];
                for (var i = 0; i < arr.length; i++) {
                    for (var j = 0; j < currArr.length; j++) {
                        if (currArr[j].id == arr[i]) {
                            tempArr.push(currArr[j]);
                        }
                    }
                }

                setTimeout(function () {
                    localStorage.setItem('StickyNotes', JSON.stringify(tempArr));
                }, 20)
            }, 10);


        }
        this.classList.remove('over');
        return false;
    };

    UpdateView.prototype.handleDragEnd = function (e) {
        // this/e.target is the source node.
        this.classList.remove('over');

        /*[].forEach.call(cols, function (col) {
          col.classList.remove('over');
        });*/
    };

    /* Drag & Drop Stuff end */

    // Code to refresh div based and attach respective handlers - Usually initialized every time some change occurs or in general "A page refresh"
    UpdateView.prototype.refreshNotesDiv = function () {
        if (mostUpdatedNotes.length === 0) {
            var ul = document.getElementById('notesList');
            ul.innerHTML = '';
        } else {
            if (document.getElementById('notesList')) {
                var ul = document.getElementById('notesList');
                ul.innerHTML = '';
            }
            var currUser = localStorage.getItem('isLoggedIn');
            for (var i = 0; i < mostUpdatedNotes.length; i++) {
                if (mostUpdatedNotes[i].user === currUser) {
                    var el = document.createElement('li');
                    el.id = mostUpdatedNotes[i].id;
                    el.draggable = true;
                    el.className = 'context';
                    el.innerHTML = '<a href="#"><h2>' + mostUpdatedNotes[i].title + '</h2><p>' + mostUpdatedNotes[i].content + '</p></a>';
                    ul.appendChild(el);
                } else {
                    continue;
                }
            }

            setTimeout(function () {
                var el = document.getElementsByClassName('context');
                var dragSrcEl = null;
                for (var i = 0; i < el.length; i++) {
                    el[i].addEventListener("contextmenu", function (event) {
                        event.preventDefault();

                        var ctxMenu = document.getElementById("ctxMenu");
                        ctxMenu.style.display = "block";
                        ctxMenu.style.left = (event.pageX - 10) + "px";
                        ctxMenu.style.top = (event.pageY - 10) + "px";

                        var el1 = document.getElementsByClassName('del');
                        var el2 = document.getElementsByClassName('edi');

                        if (event.target.href) {
                            el1[0].id = event.path[1].id;
                            el2[0].id = event.path[1].id;
                        } else {
                            el1[0].id = event.path[2].id;
                            el2[0].id = event.path[2].id;
                        }

                    }, false);

                    // Drag & Drop handlers
                    el[i].addEventListener('dragstart', UpdateView.prototype.handleDragStart, false);
                    el[i].addEventListener('dragenter', UpdateView.prototype.handleDragEnter, false);
                    el[i].addEventListener('dragover', UpdateView.prototype.handleDragOver, false);
                    el[i].addEventListener('dragleave', UpdateView.prototype.handleDragLeave, false);
                    el[i].addEventListener('drop', UpdateView.prototype.handleDrop, false);
                    el[i].addEventListener('dragend', UpdateView.prototype.handleDragEnd, false);
                    // elem.addEventListener('drop', handleDrop, false);
                    // elem.addEventListener('dragend', handleDragEnd, false);

                    el[i].addEventListener("click", function () {
                        var ctxMenu = document.getElementById("ctxMenu");
                        ctxMenu.style.display = "";
                        ctxMenu.style.left = "";
                        ctxMenu.style.top = "";
                    }, false);
                }
            }, 10);

            setTimeout(function () {
                var el1 = document.getElementsByClassName('del');
                var el2 = document.getElementsByClassName('edi');
                el1[0].addEventListener("click", function () {
                    // Delete note here
                    var LocalDataStore = new App.LocalDataStore();
                    LocalDataStore.delete(this.id);
                }, false);
                el2[0].addEventListener("click", function () {
                    // Edit note here
                    var id = this.id;
                    var arr = JSON.parse(localStorage.getItem('StickyNotes'));
                    var currItem;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].id == id) {
                            currItem = arr[i];
                        }
                    }

                    var html = "<div class=\"modal-container\">\n" +
                        "    <section class=\"create-modal\">\n" +
                        "        <div class=\"form-group title\">\n" +
                        "            <label class=\"sr-only\">Title</label>\n" +
                        "            <input type=\"text\" placeholder=\"Edit Post\" class=\"form-control s-form-control\">\n" +
                        "        </div>\n" +
                        "        <div class=\"form-group\">\n" +
                        "            <label class=\"sr-only\">Title</label>\n" +
                        "            <textarea id='titleTextEdit' type=\"text\" placeholder=\"Title...\" class=\"form-control\"></textarea>\n" +
                        "        </div>\n" +
                        "        <div class=\"form-group\">\n" +
                        "            <label class=\"sr-only\">Content</label>\n" +
                        "            <textarea id='contentTextEdit' type=\"text\" placeholder=\"Content...\" class=\"form-control\"></textarea>\n" +
                        "        </div>\n" +
                        "        <div class=\"form-group action-btn\">\n" +
                        "            <button class=\"btn btn-primary \" id='cancel-button'>Cancel</button>\n" +
                        "            <button class=\"btn btn-primary\" id='save-edit-button'>Save</button>\n" +
                        "        </div>\n" +
                        "    </section>\n" +
                        "</div>";

                    document.getElementById('modal-container').innerHTML = html;

                    setTimeout(function () {
                        document.getElementById('titleTextEdit').textContent = currItem.title;
                        document.getElementById('contentTextEdit').textContent = currItem.content;
                        document.getElementById('save-edit-button').classList.add(id);
                    }, 1);

                    setTimeout(function () {
                        document.getElementById('cancel-button').addEventListener('click', function () {
                            document.getElementById('modal-container').innerHTML = "";
                        });
                        document.getElementById('save-edit-button').addEventListener('click', function () {
                            var localStore = new App.LocalDataStore();
                            localStore.update(this.classList[2], document.getElementById('titleTextEdit').value, document.getElementById('contentTextEdit').value);
                        });
                    }, 1);

                }, false);
            }, 20);

        }
    };

    App.UpdateView = UpdateView;
    window.App = App;

})(window);
