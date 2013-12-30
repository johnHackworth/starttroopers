window.tr = window.tr || {};
window.tr.app = window.tr.app || {};

window.onload = function() {
  window.tr.app.historyDirector = new window.tr.directors.BrowsingDirector();
  window.tr.app.director = new window.tr.directors.MainDirector({history: window.tr.app.historyDirector});
  window.tr.app.director.start();
}
