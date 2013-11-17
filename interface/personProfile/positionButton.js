Crafty.c('PositionButton', {
  init: function() {
    this.requires('Button');
    this.text = Crafty.e('2D, DOM, Text')
  },
  setOptions: function(options) {
    this.person = options.person;
    this.position = options.position;
    this.x = options.x;
    this.y = options.y;
    this.buttonText = options.text;
    var self = this;
    var color ='#666666';
    if(this.person.positions.indexOf(this.position) >= 0) {
      color =  '#CCFF66';
    }
    this.set({
      color: color,
      text: this.buttonText,
      x: this.x,
      y: this.y,
      w: 80,
      h: 20,
      onClick: function(){
        if(self.person.positions.indexOf(self.position) >= 0) {
          self.unsetAction(this.position);
        } else {
          self.setAction(this.position);
        }
      }
    });
  },
  render: function() {
    var self = this;
    var color ='#666666';
    var textColor = '#FFFFFF'
    if(this.person.positions.indexOf(this.position) >= 0) {
      color =  '#CCFF66';
      textColor = '#330066'
    }
    this.color(color);
    this.text.textColor(textColor);

  },
  setAction: function(action) {
    this.person.assignPosition(action);
    this.render();
  },
  unsetAction: function(action) {
    this.person.removePosition(action);
    this.render();
  }
})
