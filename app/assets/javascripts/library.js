// Want to execute your javascript only on specific pages?
// $(document).on("stujo:loaded-library", function (event, data) {

$(document).ready(function () {
  var library = new LibraryModel();
  var view = new LibraryView();
  var controller = new LibraryController(library, view);
  controller.run();
});


