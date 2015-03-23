function LibraryController(library, view) {

  this.run = function () {
    library.books().done(function (books) {
      view.renderLibrary(books);
    }).fail(function (jqx, payload) {
      view.displayError('Unable to load library books');
    });

    $library = $('#library');

    $library.on('click', '.delete-book', function (event) {
      event.preventDefault();
      var $item = $(event.target).closest('.library-book');
      var bookId = $item.data('bookId');
      view.removeBook(bookId); // Be optomistic
      library.deleteBook(bookId).fail(function () {
        view.displayError('Unable to delete book with id ' + bookId);
      });
    });

    $library.on('click', '.read-book', function (event) {
      event.preventDefault();
      var $item = $(event.target).closest('.library-book');
      var bookId = $item.data('bookId');
      library.readBook(bookId).done(function (book) {
          view.readBook(book);
        }
      ).fail(function () {
          view.displayError('Unable to read book with id ' + bookId);
        });
    });
  };
}