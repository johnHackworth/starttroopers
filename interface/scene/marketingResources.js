window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};
window.tr.app = window.tr.app || {};
window.tr.scenes.marketingResources = {};

Crafty.scene('MarketingResources', (function() {
  var self = this;
  Crafty.background('#999933')
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 700})

  tr.app.currentView = Crafty.e('MarketingView')
}).bind(window.tr.scenes.marketingResources),
function() {

});
