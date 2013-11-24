Crafty.c('Eyes', {
  init: function() {
    this.requires('FaceLayer');
    this.setSize(250);
    this.setLayer('eyes');
    this.turnNumber = 0;
    this.lastBlink = 0;
    this.bind('EnterFrame', this.turn.bind(this))
  },
  turn: function() {
    this.turnNumber++;
    if(this.turnNumber - this.lastBlink > 100) {
      if(tr.randInt(1000) >995) {
        this.basicType = this.type;
        this.type = 'blink';
        this.refresh();
        this.lastBlink = this.turnNumber;
      }
    } else {
      if(this.type === 'blink' && (this.turnNumber - this.lastBlink > 5)) {
        this.type = this.basicType;
        this.refresh();
      }
    }
  }
});
