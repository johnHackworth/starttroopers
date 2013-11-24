Crafty.c('Mouth', {
  init: function() {
    this.requires('FaceLayer');
    this.setSize(250);
    this.setLayer('mouth');
    this.turnNumber = 0;
    this.bind('EnterFrame', this.turn.bind(this))
  },
  turn: function() {
    this.turnNumber++;
    if(this.talking) {
      if(this.turnNumber % 4 === 0) {
        this.type = 'talk'+tr.randInt(3);
        this.refresh();
      }
    } else {
      if(this.basicType && this.type !== this.basicType) {
        this.type = this.basicType;
        this.refresh();
      }
    }
  }
});
