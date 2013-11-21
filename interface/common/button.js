Crafty.c('Button', {
  init: function() {
    this.requires('2D, DOM, Mouse, HTML');
    this.text = Crafty.e('2D, DOM, , Mouse')
  },
  set: function(options) {
    this.options = options;
    this.attr({
      x: options.x || 10,
      y: options.y || 10,
      w: options.w || 100,
      h: options.h + 10 || 30,
      z: 999999
    })
    this.append('<div class="button">'+options.text+'</div>');
    // this.text.text(options.text || 'button');
    // this.text.attr({x: this.attr('x'), y: this.attr('y') + 10, w: this.attr('w')})
    // this.text.css('text-align', 'center');
    // this.color(options.color || '#666666');
    // this.text.textColor(options.textColor || '#FFFFFF');

    this.css({
      "text-align": "center",
      "background-color": options.color || '#666666',
      "color": options.textColor || '#FFFFFF'
    })
    this.bind("Click", options.onClick)
  },
  color: function(color) {
    this.css({"background-color": color})
  }
});
