window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};
window.tr.app = window.tr.app || {};
window.tr.scenes.personWorkLog = {};

Crafty.scene('PersonWorkLog', (function() {
  var self = this;
  Crafty.background('#333333')
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 800})

  tr.app.currentView = Crafty.e('PersonWorkLogView')
}).bind(window.tr.scenes.personWorkLog ),
function() {

});
