window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};
window.tr.app = window.tr.app || {};
window.tr.scenes.office = {};

Crafty.scene('Office', (function() {
  var self = this;
  var nOffices=26;
  Crafty.background('#333333')
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 800})

  this.bgChange = function() {
    self.bg.css({
      "background-image":"url(./assets/backgrounds/back"+tr.randInt(nOffices)+".png)",
      "background-position": "center"
    })
  }
  this.bgChange();

  // if(tr.app.director.worldCreated) {
    tr.app.currentView = Crafty.e('OfficeFloor')
    tr.app.currentView.bind('change:background', this.bgChange.bind(this));
  // } else {
  //   Crafty.bind('WorldCreated', function() {
  //     tr.app.currentView = Crafty.e('OfficeFloor')
  //     tr.app.currentView.bind('change:background', self.bgChange.bind(this));
  //   })
  // }
}).bind(window.tr.scenes.office ),
function() {

});
