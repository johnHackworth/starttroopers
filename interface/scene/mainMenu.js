window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};
window.tr.app = window.tr.app || {};
window.tr.scenes.mainMenu = {};

Crafty.scene('MainMenu', (function() {
  var self = this;
  Crafty.background('#333333');
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 800})
  this.bg.css({
    "background-image":"url(./assets/backgrounds/menu/b1.jpg)",
    "background-position": "center"
  })
  tr.app.currentView = Crafty.e('MainMenuView')
}).bind(window.tr.scenes.mainMenu ),
function() {

});
