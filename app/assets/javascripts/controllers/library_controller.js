function LibraryController(libraryModel, libraryView) {

  this.run = function () {
    libraryModel.books().done(function (books) {
      libraryView.renderLibrary(books);
    }).fail(function (jqx, payload) {
      libraryView.displayError('Unable to load library books');
    });

    libraryView.events.on('library:delete-book', function (event, bookId) {
      libraryView.removeBook(bookId); // Be optomistic
      libraryModel.deleteBook(bookId).fail(function () {
        libraryView.displayError('Unable to delete book with id ' + bookId);
      });
    });

    libraryView.events.on('library:read-book', function (event, bookId) {
      libraryModel.readBook(bookId).done(function (book) {
          libraryView.readBook(book);
        }
      ).fail(function () {
          libraryView.displayError('Unable to read book with id ' + bookId);
        });
    });
  };
}