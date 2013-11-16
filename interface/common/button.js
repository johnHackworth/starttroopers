Crafty.c('Button', {
  init: function() {
    this.requires('2D, DOM, Mouse, Color');
    this.text = Crafty.e('2D, DOM, Text')
  },
  set: function(options) {
    this.attr({
      x: options.x || 10,
      y: options.y || 10,
      w: options.w || 100,
      h: options.h + 10 || 30
    })
    this.css({
      "text-align": "center",
      "height": options.h || 20,
      "padding-top": 5
    })
    this.text.text(options.text || 'button');
    this.text.attr({x: this.attr('x'), y: this.attr('y') + 10, w: this.attr('w')})
    this.text.css('text-align', 'center');
    this.color(options.color || '#666666');
    this.text.textColor(options.textColor || '#FFFFFF');

    this.bind("Click", options.onClick)
  }
});
