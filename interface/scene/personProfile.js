window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};
window.tr.app = window.tr.app || {};
window.tr.scenes.personProfile = {};

Crafty.scene('PersonProfile', (function() {
  var self = this;
  Crafty.background('#000000')
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 800})

  tr.app.currentView = Crafty.e('PersonProfileSheet')
}).bind(window.tr.scenes.personProfile ),
function() {

});
