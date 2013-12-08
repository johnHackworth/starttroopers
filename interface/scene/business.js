window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};
window.tr.app = window.tr.app || {};
window.tr.scenes.business = {};

Crafty.scene('Business', (function() {
  var self = this;
  Crafty.background('#000000')
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 800})

  tr.app.currentView = Crafty.e('BusinessBrief')
}).bind(window.tr.scenes.business ),
function() {

});
