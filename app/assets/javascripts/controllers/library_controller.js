function LibraryController(model, view) {

  this.run = function () {

    model.books().done(function (books) {
      view.renderLibrary(books);
    }).fail(view.displayError);

    view.events.on('library:delete-book', function (event, bookId) {
      view.removeBook(bookId); // Be optomistic on delete
      model.deleteBook(bookId).fail(view.displayError);
    });

    view.events.on('library:read-book', function (event, bookId) {
      model.readBook(bookId).done(function (book) {
          view.readBook(book);
        }
      ).fail(view.displayError);
    });
  };
}