function LibraryModel() {

  this.books = function () {
    var result = $.Deferred();
    $.getJSON('/api/books').done(function (data) {
      result.resolve(data.books);
    }).fail(function () {
      result.reject('Unable to Load Books for Library');
    });
    return result;
  };

  this.deleteBook = function (bookId) {
    var result = $.Deferred();
    $.ajax({
      url: '/api/books/' + bookId, method: 'delete'
    }).done(function () {
      result.resolve(bookId);
    }).fail(function () {
      result.reject('Unable to Delete Book');
    });
    return result;
  };

  this.readBook = function (bookId) {
    var result = $.Deferred();
    $.ajax({
      url: '/api/books/' + bookId + '/readit',
      method: 'post'
    }).done(function (data) {
      result.resolve(data.book);
    }).fail(function () {
      result.reject('Unable to Read Book');
    });

    return result;
  }

}