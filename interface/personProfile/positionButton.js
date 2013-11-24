Crafty.c('PositionButton', {
  init: function() {
    this.requires('Button');
  },
  setOptions: function(options) {
    this.person = options.person;
    this.position = options.position;
    this.x = options.x;
    this.y = options.y;
    this.buttonText = options.text;
    var self = this;
    var color ='#666666';
    var textColor = '#FFFFFF';
    if(this.person.positions.indexOf(this.position) >= 0) {
      color =  '#CCFF66';
      textColor = '#330066'
    } else if(this.person.raisingFunds && this.position === 'funds') {
      color =  '#CCFF66';
      textColor = '#330066'
    }
    this.set({
      color: color,
      text: this.buttonText,
      textColor: textColor,
      x: this.x,
      y: this.y,
      w: 80,
      h: 20,
      onClick: function(){
        if(self.position === 'funds') {
          if(self.person.raisingFunds) {
            self.unsetAction('funds');
          } else {
            self.setAction('funds');
          }
        } else {
          if(self.person.positions.indexOf(self.position) >= 0) {
            self.unsetAction(this.position);
          } else {
            self.setAction(this.position);
          }
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
    } else if(this.person.raisingFunds && this.position === 'funds') {
      color =  '#CCFF66';
      textColor = '#330066'
    }
    this.css({'background-color': color, 'color': textColor});

  },
  setAction: function(action) {
    this.person.assignPosition(action);
    this.trigger('toggle');
    this.render();
  },
  unsetAction: function(action) {
    this.person.removePosition(action);
    this.trigger('toggle');
    this.render();
  }
})
