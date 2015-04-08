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
    this.barColors = options.barColors;
    this.topValue = options.topValue;
    this.barWidth = options.barWidth || 35;
    this.barPadding =  options.barPadding || 0;
    this.render();
  },
  render: function() {
    var i = 0;
    for(var n in this.bars) {
      this.bars[n].destroy();
    }

    var topValue = this.topValue || 1;
    if(topValue === 1) {
      for(var o in this.values) {
        if(this.values[o] > topValue) {
          topValue = this.values[o];
        }
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
      if(typeof this.values[m] === 'object') {
        this.createMultiBar(topValue, i, m);
      } else {
        this.createSingleBar(topValue, i, m);
      }
      i++;
    }
    if(this.barColors) {
      this.createLegend();
    }
    this.ready = true;
  },
  createLegend: function() {
    var x = this.attr('x') + 10;
    var y = this.attr('y') + this.attr('h') + 10;
    this.legend = [];
    var i = 0;
    for(var n in this.barColors) {
      console.log(n);
      var legendNode = Crafty.e('2D, DOM, Color, HTML');
      legendNode.attr({
        x: x + 70*i,
        y: y,
        w: 65,
        h: 30
      })
      .append('<div class="legendNode">'+n+'</div>')
      .color(this.barColors[n]);
      this.legend.push(legendNode);
      i++;
    }
  },
  createSingleBar: function(topValue, i, m) {
    var x = this.attr('x') + 10;
    var y = this.attr('y');

    var bar = Crafty.e('Bar');
    bar.set({
      x: x + i* (this.barWidth + this.barPadding),
      y: y + 30,
      w: this.barWidth,
      maxHeight: this.attr('h') - 30,
      topValue: topValue,
      barColor: this.barColor
    })
    bar.value(this.values[m]);
    this.bars.push(bar);
  },
  createMultiBar: function(topValue, i, m) {
    var x = this.attr('x') + 10;
    var y = this.attr('y');
    var currentY = y + 30;
    for(var n in this.values[m]) {
      var bar = Crafty.e('Bar');
      var color = this.barColor;
      if(this.barColors && this.barColors[n]) {
        color = this.barColors[n];
      }
      var xPos = x + i* (this.barWidth + this.barPadding);
      console.log(xPos, x, i, this.barWidth, this.barPadding)
      bar.set({
        x: xPos,
        y: currentY,
        w: this.barWidth,
        maxHeight: this.attr('h') - 30,
        topValue: topValue,
        barColor: color
      })
      bar.value(this.values[m][n]);
      this.currentY -= bar.attr('h');
      this.bars.push(bar);
    }
  }
})
