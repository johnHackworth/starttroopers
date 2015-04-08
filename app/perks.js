window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Perk = function(name) {
  this.id = name;
  this.initialize();
}

window.tr.models.Perk.prototype = {
  initialize: function() {
    var perk = tr.data.perks[this.id];
    for(var n in perk) {
      this[n] = perk[n];
    }
  },
  applyEffects: function(person) {
    for(var n in this.effects) {
      if(isNaN(this.effects[n])) {
        person[n] = this.effects[n]
      } else {
        if(this.randEffects) {
          person[n] += tr.randInt(this.effects[n])
        } else {
           person[n] += this.effects[n]
        }
      }
    }
    person.trimStats();
  }
}
