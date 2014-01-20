Crafty.c('Person', {
  init: function(options) {

    this.requires('2D, DOM, Text, Tween');

  },
  assignPerson: function(options) {
    this.attr({w:100, h:100})
    this.person = options.person;
    this.face = Crafty.e('PersonFace, Draggable');
    window.aaa = this;
    this.face.assignPerson({person: this.person});
    this.face.setSize(100);
    this.attach(this.face);
    this.face.attachLayers();
    this.goToLocation();
    this.face.bind('StartDrag', this.setAsDragging.bind(this));
    this.face.bind('StopDrag', this.reasignPersonViewCoordinates.bind(this));
    this.face.enableDrag();
  },
  setAsDragging: function() {
    var self = this;
    this.dragging = true;
    setTimeout(function() {
      self.face.dragging = self.dragging;
    },300)

  },
  reasignPersonViewCoordinates: function() {
    var self = this;
    this.dragging = false;
    this.person.personViewX = this.face.x;
    this.person.personViewY = this.face.y;
    setTimeout(function() {
      self.face.dragging = self.dragging;
    },25);
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
    this.unbind('StartDrag');
    this.unbind('StopDrag');
    this.face.delete();
    this.destroy();
  }
})
