window.tr = window.tr || {};
window.tr.scenes = window.tr.scenes || {};

window.tr.scenes.PersonSocial = {};

Crafty.scene('PersonSocial', (function() {
  var self = this;
  Crafty.background('#000000');
  this.bg = Crafty.e("2D, DOM")
             .attr({x:0, y: 0, w: 1200, h: 700})

  window.profile = Crafty.e('PersonSocialSheet')
}).bind(window.tr.scenes.PersonSocial ),
function() {

});
