window.tr = window.tr || {};
window.tr.utils = window.tr.utils || {};
window.tr.log = [];
window.tr.utils.Loggable = function() {
  this.logFile = [];
};

window.tr.utils.Loggable.prototype = {
  log: function(text, level) {
    if(!level) {
      level = 0;
    }
    var currentTurn = this.currentTurn; // I feel dirty for this global ref >_<
    this.logFile.unshift({turn: currentTurn, text: text, level: level});
    window.tr.log.unshift({turn: currentTurn, text: text, level: level});
    console.log(text);
  }
}
