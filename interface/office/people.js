Crafty.c('Person', {
  init: function(options) {

    this.requires('2D, DOM, Text, Tween');

  },
  assignPerson: function(options) {
    this.attr({w:100, h:100})
    this.person = options.person;
    this.face = Crafty.e('PersonFace');
    this.face.assignPerson({person: this.person});
    this.face.setSize(100);
    this.attach(this.face);
    this.face.attachLayers();
    this.goToLocation();
  },
  goToLocation: function() {
    this.tween({
      x: this.person.personViewX,
      y: this.person.personViewY
    }, 30);
  },
  setSize: function(size) {
    this.face.setSize(size);
  },
  delete: function() {
    this.face.delete();
    this.destroy();
  }
})
