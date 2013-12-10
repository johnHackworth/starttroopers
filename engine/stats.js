window.tr = window.tr || {};
window.tr.utils = window.tr.utils || {};

window.tr.utils.Stats = function() {
  this.subscriptions = {};
};

window.tr.utils.Stats.prototype = {
  increaseStat: function(statName, value) {
    this[statName] += value;
    if(this[statName] > 100) {
      this[statName] = 100;
    }
    if(this[statName] < 1) {
      this[statName] = 1;
    }
  }
}
