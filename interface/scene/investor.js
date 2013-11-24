window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};

window.tr.scenes.investor = {};

Crafty.scene('Investor', (function() {
  var self = this;
  Crafty.background('#000000')
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 800})

  window.office = Crafty.e('InvestorView')
}).bind(window.tr.scenes.investor ),
function() {

});
