Crafty.c('Bar', {
  init: function() {
    this.requires('DOM, 2D, Color, Text, Tween');
  },
  set: function(options) {
    this.attr({
      x: options.x || 5,
      y: options.y || 5,
      w: options.w || 35,
      h: options.h || 1
    }).color(options.barColor || '#CC4422')
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
    this.title = Crafty.e('2D, DOM, HTML');
    this.color('rgba(100,100,100,0.5)')
  },
  set: function(options) {
    this.values = options.values;
    this.titleText = options.title;
    this.barColor = options.barColor || '#CC4422'
    this.render();
  },
  render: function() {
    var x = this.attr('x') + 10;
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
    if(this.title) {
      this.title.replace('<div class="titleGraph">'+this.titleText+'</div>');
      this.title.attr({
        x: this.attr('x'),
        y: this.attr('y'),
        w: this.attr('w'),
        h: 25
      })
    }
    for(var m in this.values) {
      var bar = Crafty.e('Bar');
      bar.set({
        x: x + i*35,
        y: y + 30,
        w: 35,
        maxHeight: this.attr('h') - 30,
        topValue: topValue,
        barColor: this.barColor
      })
      bar.value(this.values[m]);
      this.bars.push(bar);
      i++;
    }
    this.ready = true;
  }
})
