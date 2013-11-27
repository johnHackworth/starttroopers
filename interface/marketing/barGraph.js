Crafty.c('Bar', {
  init: function() {
    this.requires('DOM, 2D, Color, Text, Tween');
  },
  set: function(options) {
    this.attr({
      x: options.x || 5,
      y: options.y || 5,
      w: options.w || 30,
      h: options.h || 1
    }).color(options.color || '#6699CC')
    this.maxHeight = options.maxHeight || 100;
    this.topValue = options.topValue || 100;
  },
  value: function(val) {
    var height = Math.floor(val / this.topValue * this.maxHeight);
    var newY = this.attr('y') + (this.maxHeight - height);
    this.tween({
      h: height,
      y: newY
    }, 50).text(val)
  },
  render: function() {
    this.ready = true;
  }
});

Crafty.c('BarGraph', {
  init: function() {
    this.requires('DOM, Text, Color');
    this.render();
    this.bars = [];
  },
  set: function(values) {
    this.values = values;
    this.render();
  },
  render: function() {
    var x = this.attr('x');
    var y = this.attr('y');
    var i = 0;
    for(var n in this.bars) {
      this.bars[n].destroy();
    }
    var topValue = 1;
    for(var o in this.values) {
      if(this.values[o] > topValue) {
        topValue = this.values[o];
      }
    }

    for(var m in this.values) {
      var bar = Crafty.e('Bar');
      bar.set({
        x: x + i*30,
        y: y,
        w: 30,
        maxHeight: 100,
        topValue: topValue
      })
      bar.value(this.values[m]);
      this.bars.push(bar);
      i++;
    }
    this.ready = true;
  }
})
