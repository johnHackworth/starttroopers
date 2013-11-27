window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};
window.tr.app = window.tr.app || {};
window.tr.scenes.office = {};

Crafty.scene('Office', (function() {
  var self = this;
  var nOffices=23;
  Crafty.background('#000000')
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 700})

  this.bgChange = function() {
    self.bg.css({
      "background-image":"url(/assets/backgrounds/back"+tr.randInt(nOffices)+".png)",
      "background-position": "center"
    })
  }
  this.bgChange();

  tr.app.currentView = Crafty.e('OfficeFloor')
  tr.app.currentView.bind('change:background', this.bgChange.bind(this));
}).bind(window.tr.scenes.office ),
function() {

});
