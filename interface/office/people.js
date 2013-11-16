Crafty.c('Person', {
  init: function(options) {

    this.requires('2D, DOM, Text');

  },
  assignPerson: function(options) {
    this.attr({w:100, h:100, x: options.x, y: options.y})
    this.person = options.person;
    this.face = Crafty.e('PersonFace');
    this.face.assignPerson({person: this.person});
    this.face.setSize(100);
    this.face.setPosition(this.x, this.y)
  }
})
