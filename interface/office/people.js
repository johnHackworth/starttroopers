Crafty.c('Person', {
  init: function(options) {

    this.requires('DOM, Text, Color');

  },
  assignPerson: function(options) {
    console.log(options);
    this.attr({w:100, h:100, x: options.x, y: options.y})
    this.color('#FEFEFE');
    this.person = options.person;
    this.render();
  },
  render: function() {
    this.ready = true;
    console.log("turn of " + this.person.name);
    this.text('hello ' + this.person.name)
        .textColor('#555555')
    Crafty.trigger("Change");
  }
})
