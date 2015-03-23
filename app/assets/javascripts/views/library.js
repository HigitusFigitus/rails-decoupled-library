function LibraryView() {
  bookTemplate = Handlebars.compile($("#book-template").html());
  libraryTemplate = Handlebars.compile($("#library-template").html());
  libraryBookTemplate = Handlebars.compile($("#library-book-template").html());

  Handlebars.registerHelper('bookClass', function (book) {
    return (book.read_count > 0) ? 'book-read' : 'book-unread';
  });

  Handlebars.registerPartial("libraryBook", libraryBookTemplate);

  this.renderLibrary = function (books) {
    $('#library').html(libraryTemplate({books: books})).removeClass('loading');
  };

  this.readBook = function (book) {
    var $libraryItem = $('#library').find('.library-book[data-book-id=' + book.id + ']');
    $libraryItem.parent().html(libraryBookTemplate(book));
    var $feature = $('#book-featured');
    if ($feature.data('bookId') != book.id) {
      var content = bookTemplate({book: book});
      $feature.fadeOut('fast', function () {
        $feature.data('bookId', book.id);
        $feature.html(content);
        $feature.fadeIn('slow');
      });
    }
  };

  this.removeBook = function (bookId) {
    // Clear Featured, if it's this one!
    if ($('#book-featured').data('bookId') == bookId) {
      $('#book-featured').html('');
    }
    var $libraryItem = $('#library').find('.library-book[data-book-id=' + bookId + ']');
    $libraryItem.hide('slow', function () {
      $libraryItem.remove();
    });
  };

  this.displayError = function (errorMessage) {
    console.log(errorMessage);
  }

}