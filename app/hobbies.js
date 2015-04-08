window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Hobbie = function(name) {
  this.id = name;
  this.initialize();
};

window.tr.models.Hobbie.prototype = {
  initialize: function() {
    var hobbie = tr.data.hobbies[tr.randInt(tr.data.hobbies.length)];
    for(var n in hobbie) {
      this[n] = hobbie[n];
    }
  },
  applyEffects: function(person) {
    for(var n in this.effects) {
      if(isNaN(this.effects[n])) {
        person[n] = this.effects[n];
      } else {
        if(this.randEffects) {
          person[n] += tr.randInt(this.effects[n]);
        } else {
           person[n] += this.effects[n];
        }
      }
    }
    person.trimStats();
  }
};
