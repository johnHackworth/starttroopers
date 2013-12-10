window.tr.app = window.tr.app || {};window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};
window.tr.app = window.tr.app || {};
window.tr.scenes.project = {};

Crafty.scene('Project', (function() {
  var self = this;
  Crafty.background('#333333')
  var nProduct = 4;
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 800})
  this.bgChange = function() {
    self.bg.css({
      "background-image":"url(./assets/backgrounds/product/prod"+tr.randInt(nProduct)+".png)",
      "background-position": "center"
    })
  }
  this.bgChange();
  tr.app.currentView = Crafty.e('ProjectResources')
}).bind(window.tr.scenes.project),
function() {

});
