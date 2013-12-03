Crafty.c('Slider', {
  init: function() {
    this.requires('2D, DOM, Color, Mouse');
    this.bar = Crafty.e('2D, DOM, Color, Tween');
    this.bar.attr({
      w: 10,
      h: 30
    }).color('#999999')
    this.attr({
      w: 200,
      h: 200
    }).color('#FCFCFC')

    this.valueView = Crafty.e('2D, DOM, Text')
    this.valueView.attr({
      w: 40,
      h: 30
    })

    this.bind('Click', this.clickSlider.bind(this));
    this.bind('MouseDown', this.mouseDownSlider.bind(this));
    this.bind('MouseUp', this.mouseUpSlider.bind(this));
    this.bind('MouseOut', this.mouseUpSlider.bind(this));

    this.bind('MouseMove', this.checkSlide.bind(this));

  },
  set: function(options) {
    this.options = options;
    this.showValue = options.showValue || false;
    this.attr({
      x: options.x || 10,
      y: options.y || 10,
      w: options.w || 100,
      h: options.h || 30
    })
    this.maxValue = options.max || 100;
    this.minValue = options.min || 0;
    this.bar.attr('x', this.attr('x'))
    this.bar.attr('y', this.attr('y'))
    this.bar.attr('h', this.attr('h'))

    if(this.showValue) {
      this.valueView.attr({
        x: this.attr('x') + this.attr('w') + 5,
        y: this.attr('y')
      })
    }

  },
  setValue: function(value, quick) {
    if(value > this.maxValue) {
      value = this.maxValue;
    }
    this.value = value;
    var val = this.value - this.minValue;
    var top = this.maxValue - this.minValue;

    var percentage = val / top;
    var x = this.attr('x') + (this.attr('w') - 10) * percentage;

    if(!quick) {
      this.bar.tween({
        "x": x
      },20)
    } else {
      this.bar.attr('x', x)
    }
    if(this.showValue) {
      this.valueView.text(Math.floor(this.value))
    } else {
      this.valueView.text('');
    }
  },
  getValue: function() {
    return this.value
  },
  clickSlider: function(ev) {
    var posX = ev.x - this.attr('x');
    var percentage = posX / (this.attr('w') - 10);
    var val = (this.maxValue - this.minValue) * percentage;
    this.setValue(val + this.minValue);
  },
  mouseDownSlider: function(ev) {
    this.mouseDown = true;
  },
  mouseUpSlider: function(ev) {
    this.mouseDown = false;
  },
  checkSlide: function(ev) {
    if(this.mouseDown) {
      var posX = ev.x - this.attr('x');
      var percentage = posX / (this.attr('w') - 10);
      var val = (this.maxValue - this.minValue) * percentage;
      this.setValue(val + this.minValue, true);
    }
  }
});
