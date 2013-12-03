window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};
window.tr.app = window.tr.app || {};
window.tr.scenes.employeeSearch = {};

Crafty.scene('EmployeeSearch', (function() {
  var self = this;
  Crafty.background('#000000')
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 700})

  tr.app.currentView = Crafty.e('EmployeeSearchView')
}).bind(window.tr.scenes.employeeSearch),
function() {

});
