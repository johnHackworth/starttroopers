Crafty.c('HTMLText', {
  init: function() {
    this.requires('2D, DOM, HTML')
  },
  set: function(options) {
    options.h = options.h || 16;
    options.w = options.w || 50;
    options.x = options.x || 10;
    options.y = options.y || 10;
    options.text = options.text || '';

    this.attr({
      h: options.h,
      w: options.w,
      x: options.x,
      y: options.y,
      z: 99999
    })
    this.append('<div class="'+options.class+'">'+options.text+'</div>');
  }
})
