window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};

window.tr.scenes.office = {};

Crafty.scene('Office', (function() {
  var self = this;
  Crafty.background('#000000')
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 800})

  window.office = Crafty.e('OfficeFloor')
}).bind(window.tr.scenes.office ),
function() {

});
