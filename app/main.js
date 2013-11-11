window.tr = window.tr || {};
window.tr.app = window.tr.app || {};

window.onload = function() {
  window.tr.app.director = new window.tr.directors.MainDirector();
  window.tr.app.director.start();
}
