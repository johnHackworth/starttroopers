window.tr = window.tr || {};
window.tr.utils = window.tr.utils || {};

window.tr.utils.Stats = function() {
  this.subscriptions = {};
};

window.tr.utils.Stats.prototype = {
  increaseStat: function(statName, value) {
    if(isNaN(value)) {
      return;
    }
    this[statName] += value;
    this.trimStat(statName);
  },
  trimStat: function(statName) {
    if(this[statName] >= 100) {
      this[statName] = 99;
    }
    if(this[statName] < 1) {
      this[statName] = 1;
    }
  }
}
