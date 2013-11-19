window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};

window.tr.scenes.product = {};

Crafty.scene('Product', (function() {
  var self = this;
  Crafty.background('#000000')
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 800})

  window.productView = Crafty.e('ProductProfile')
}).bind(window.tr.scenes.product),
function() {

});
