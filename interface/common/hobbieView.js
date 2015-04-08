Crafty.c('HobbieView', {
  hintText: '',
  init: function() {
    this.requires('2D, DOM, Mouse, HTML, Hint');
    this.text = Crafty.e('2D, DOM, , Mouse');
  },
  set: function(options) {
    this.options = options;
    this.attr({
      x: options.x || 10,
      y: options.y || 10,
      w: 40,
      h: 40,
      z: 999999
    });
    this.hobbie = options.hobbie;
    this.hintText = '<strong>'+this.hobbie.name + '</strong>';
    this.effectText = '';
    for(var n in this.hobbie.effects) {
      this.effectText += '<br/>' + n + ':' + this.hobbie.effects[n];
    }
    this.hintText += '<br/>' + this.effectText;

    this.replace('<div class="hobbieView"><img src="./assets/hobbies/'+this.hobbie.icon+'.png"></div>');
  }
});
