function LibraryView($libraryDiv, $featureDiv) {

  // Compile Templates
  var bookTemplate = Handlebars.compile($("#book-template").html());
  var libraryTemplate = Handlebars.compile($("#library-template").html());
  var libraryBookTemplate = Handlebars.compile($("#library-book-template").html());

  // Setup Handlebars
  Handlebars.registerHelper('bookClass', function (book) {
    return (book.read_count > 0) ? 'book-read' : 'book-unread';
  });

  Handlebars.registerPartial("libraryBook", libraryBookTemplate);

  // Support Custom Events
  var _viewEvents = $({});

  bindBookEvent('read-book');
  bindBookEvent('delete-book');

  function renderLibrary(books) {
    $libraryDiv.html(libraryTemplate({books: books})).removeClass('loading');
  }

  function readBook(book) {
    var $libraryItem = $libraryDiv.find('.library-book[data-book-id=' + book.id + ']');
    $libraryItem.parent().html(libraryBookTemplate(book));

    if ($featureDiv.data('bookId') != book.id) {
      var content = bookTemplate({book: book});
      $featureDiv.fadeOut('fast', function () {
        $featureDiv.data('bookId', book.id);
        $featureDiv.html(content);
        $featureDiv.fadeIn('slow');
      });
    }
  }

  function removeBook(bookId) {
    // Clear Featured, if it's this one!
    if ($featureDiv.data('bookId') == bookId) {
      $featureDiv.html('');
    }
    var $libraryItem = $libraryDiv.find('.library-book[data-book-id=' + bookId + ']');
    $libraryItem.hide('slow', function () {
      $libraryItem.remove();
    });
  }

  function displayError(errorMessage) {
    console.error(errorMessage);
  }

  function displayInfo(message) {
    console.log(message);
  }

  // Capture book specific events, extract the bookId and fire the
  // related custom event
  function bindBookEvent(type) {
    $libraryDiv.on('click', '.' + type, function (event) {
      event.preventDefault();
      var $item = $(event.target).closest('.library-book');
      var bookId = $item.data('bookId');
      console.log('Triggering Custom Event library:' + type + " for book id " + bookId);
      _viewEvents.triggerHandler('library:' + type, bookId);
    });
  }

  return {
    renderLibrary: renderLibrary,
    displayError: displayError,
    displayInfo: displayInfo,
    removeBook: removeBook,
    readBook: readBook,
    events: _viewEvents
  }
}