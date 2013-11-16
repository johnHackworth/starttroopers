Crafty.c('PersonFace', {
  size: 100,
  init: function() {
    this.requires('2D, DOM, Text, Sprite, Tween, Mouse');
    this.attr({w:100, h:100, x: 5, y: 5});
    this.bind('MouseOver', this.showName.bind(this));
    this.bind('MouseOut', this.hideName.bind(this));
    this.bind('Click', this.selectPerson.bind(this));
  },
  components: [
    "Background", "Face","Facialfeatures", "Beard", "Eyes", "Nose",  "Mouth", "Hair", "Glasses", "Clothes"
  ],
  showName: function() {
    this.name.tween({alpha: 0.9}, 30);
  },
  hideName: function() {
    this.name.tween({alpha: 0.0}, 30);
  },
  setSize: function(size) {
    this.attr({
      x:size,
      y:size
    })
    for(var n in this.components) {
      this.size = size;
      this[this.components[n].toLowerCase()].setSize(this.size);
    }
    this.name.attr({w: size})
  },
  setPosition: function(x, y) {
    this.attr({x: x, y: y});
    for(var n in this.components) {
      this[this.components[n].toLowerCase()].attr({x:x, y: y})
    }
    this.name.attr({x: x, y:y + 2+ this.size})
  },
  assignPerson: function(options) {
    if(options.x && options.y) {
      this.attr({x: options.x, y: options.y})
      this.x = options.x;
      this.y = options.y + this.size;
    }
    this.person = options.person;
    for(var n in this.components) {
      this[this.components[n].toLowerCase()] = Crafty.e(this.components[n]);
      this[this.components[n].toLowerCase()].assignPerson(this.person);
    }
    this.name = Crafty.e('2D, DOM, Color, Text, Tween');
    console.log(this.x, this.y)
    this.name.text(this.person.name).attr({
      x: this.x,
      y: this.y,
      w: this.size,
      h: 15,
      alpha: 0.0
    }).css({
      textAlign: 'center',
      "border-radius": "3px"
    }).color('#333333')
    .textColor('#FEFEFE')
    this.render();
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },
  selectPerson: function() {
    tr.app.director.selectedPerson = this.person;
    Crafty.trigger("PersonSelected")
  }
});
