function LibraryModel() {

  this.books = function () {
    return $.ajax({url: '/api/books'}).then(function (data) {
      return data.books;
    });
  };

  this.deleteBook = function (bookId) {
    return $.ajax({
      url: '/api/books/' + bookId, method: 'delete'
    });
  };

  this.readBook = function (bookId) {
    return $.ajax({
      url: '/api/books/' + bookId + '/readit',
      method: 'post'
    }).then(function (data) {
      return data.book
    });
  }

}