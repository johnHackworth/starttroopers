Crafty.c('ProgressBar', {
  init: function() {
    this.requires('2D, DOM, Color');
    this.progress = Crafty.e('2D, DOM, Color, Tween');
    this.progresses = [];
  },
  setOptions: function(options) {
    this.options = options;
    this.attr({
      x: options.x || 10,
      y: options.y || 10,
      w: options.w || 100,
      h: options.h + 10 || 30,
      z: 999999
    })
    this.text = options.text;

    if(options.values) {
      var xPos = 0;
      for(var n in options.values) {
        var val = Crafty.e('2D, DOM, Color, Tween');
        val.attr({
          x: options.x + xPos || 1000 + xPos,
          y: options.y || 10,
          w: 10,
          h: options.h + 10 || 30,
          z: 9991000
        })
        xPos += 10;
        val.color(options.values[n] || '#66FF66')
        this.progresses.push(val);
      }
    } else {
      this.progress.attr({
        x: options.x || 1000,
        y: options.y || 10,
        w: 10,
        h: options.h + 10 || 30,
        z: 9991000
      })
      this.progress.color(options.progressColor || '#66FF66')

    }
    this.css({
      "text-align": "center",
      "height": options.h || 20,
    })
    this.color(options.color || '#666666');
    if(this.text) {
      this.textLayer = Crafty.e('2D, DOM, HTML')
      this.textLayer.attr({
        x: this.x,
        y: this.y,
        w: this.w,
        h: this.h,
        z: 9991001
      }).replace('<div class="progressBarText">'+this.text+'</div>')
    }
  },
  setValue: function(value) {
    var newValue = this.attr("w") * value / 100;
    this.progress.tween({
      "w": newValue
    },10)
  },
  setValues: function(values) {
    var xPos = this.attr('x');
    for(var n in this.progresses) {
      var value = values[n];
      var newValue = (this.attr("w") / this.progresses.length) * value / 100;
      this.progresses[n].tween({
        "w": newValue,
        "x": xPos
      },10)
      xPos += newValue;
    }

  }
});
