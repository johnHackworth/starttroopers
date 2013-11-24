Crafty.c('HTMLStructure', {
  html: '',
  init: function() {
    this.requires('2D, DOM, HTML');
    this.options = {
      x:20,
      y:70,
      w: 1000,
      h: 200,
      html: ''
    }
  },
  set: function(options) {
    for(var n in options) {
      this.options[n] = options[n]
    }
    this.attr({
      x:this.options.x,
      y:this.options.y,
      w:this.options.w,
      h:this.options.h,
      z: 99999999
    })
    this.html = this.options.html || "";
  },
  renderData: function(json) {
    var text = this.html;
    for(var n in json){
      text = text.replace(new RegExp('%'+n.toUpperCase()+'%','g'), json[n])
    }
    this.replace(text);
  }
});
