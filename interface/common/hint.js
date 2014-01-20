Crafty.c('Hint', {
  hintHTML: '<div class="hintBox">%TEXT%</div>',
  hintWidth: 100,
  hintMargin: 10,
  init: function() {
    this.requires('Mouse');
    this.bind('MouseOver', this.showHint.bind(this));
    this.bind('MouseOut', this.hideHint.bind(this));
    // this.bind('MouseMove', this.showHi nt.bind(this));
    this.bind('Remove', this.delete.bind(this));
  },
  showHint: function(ev) {
    if(!this.hintText) {
      return;
    }
    var self = this;
    if(!this.hintObj) {
      this.hintObj = Crafty.e('2D, DOM, HTML, Tween, Delay')
      this.hintObj.attr({z: 9999999999999, alpha: 0, x: this.attr('x'), y: this.hintMargin + this.y + this.h, w: this.hintWidth, h: 30})
      this.hintObj.replace(this.hintHTML
        .replace(/%TEXT%/g, this.hintText)
      )
    }
    // this.hintObj.attr({})
    this.hintObj.delayed = true;
    this.hintObj.delay(function(){
      if(!self || !self.hintObj) {
        return;
      }
      if(self.hintObj.delayed) {
        var x = ev.x - self.w /2 - (window.innerWidth - 1200)/2;
        if(!self.centerHint) {
          x = self.x;
        }
        self.hintObj.tween({'x': x, alpha: 0.8}, 15)
      }
    },500)
  },
  hideHint: function() {
    if(!this.hintObj) {
      return;
    }
    this.hintObj.delayed = false;
    this.hintObj.tween({alpha: 0}, 15)
  },
  delete: function() {
    this.hintObj && this.hintObj.destroy();
  }
});
