Crafty.c('PerkView', {
  hintText: '',
  init: function() {
    this.requires('2D, DOM, Mouse, HTML, Hint');
    this.text = Crafty.e('2D, DOM, , Mouse')
  },
  set: function(options) {
    this.options = options;
    this.attr({
      x: options.x || 10,
      y: options.y || 10,
      w: 50,
      h: 50,
      z: 999999
    });
    this.perk = options.perk;
    this.hintText = '<strong>'+this.perk.name + '</strong><br/>' + this.perk.description;
    this.effectText = '';
    for(var n in this.perk.effects) {
      this.effectText += '<br/>' + n + ':' + this.perk.effects[n];
    }
    this.hintText += '<br/>' + this.effectText;

    this.replace('<div class="perkView"><img src="./assets/perks/'+this.perk.icon+'.png"></div>');
  }
});
