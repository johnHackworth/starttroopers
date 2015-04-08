Crafty.c('ProgressBubble', {
  init: function() {
     this.requires('2D, DOM, HTML, Tween, Delay');
  },
  set: function(options) {
    this
      .replace('<div class="bubble '+options.workType+'"></div>')
      .attr({
        w: 10 * options.workAmount,
        h: 10 * options.workAmount,
        x: options.x,
        y: options.y,
        z: 999999999999999999999
      })
    this.tween({
      x: 290 + tr.randInt(100),
      y: 30,
      alpha: 0.3
    }, 50 + tr.randInt(40))
    .bind('TweenEnd', this.destroy.bind(this));
  }

});
