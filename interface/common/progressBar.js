Crafty.c('ProgressBar', {
  init: function() {
    this.requires('2D, DOM, Color');
    this.progress = Crafty.e('2D, DOM, Color, Tween');
  },
  setOptions: function(options) {
    this.options = options;
    this.attr({
      x: options.x || 10,
      y: options.y || 10,
      w: options.w || 100,
      h: options.h + 10 || 30
    })
    this.progress.attr({
      x: options.x || 1000,
      y: options.y || 10,
      w: 10,
      h: options.h + 10 || 30
    })
    this.progress.color(options.progressColor || '#66FF66')
    this.css({
      "text-align": "center",
      "height": options.h || 20,
    })
    this.color(options.color || '#666666');
  },
  setValue: function(value) {
    var newValue = this.attr("w") * value / 100;
    this.progress.tween({
      "w": newValue
    },10)
  }
});
