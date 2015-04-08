window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};
window.tr.app = window.tr.app || {};
window.tr.scenes.PersonProjects = {};

Crafty.scene('PersonProjects', (function() {
  var self = this;
  Crafty.background('#333333');
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 800})
  self.bg.css({
    "background-image":"url(./assets/backgrounds/texture1.jpg)",
    "background-position": "center"
  })
  tr.app.currentView = Crafty.e('PersonProjectsSheet')
}).bind(window.tr.scenes.PersonProjects ),
function() {

});
