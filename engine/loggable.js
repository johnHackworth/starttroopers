window.tr = window.tr || {};
window.tr.utils = window.tr.utils || {};
window.tr.log = [];
window.tr.utils.Loggable = function() {
  this.logFile = [];
  this.attachedLogs = [];
};

window.tr.utils.Loggable.prototype = {
  attachLog: function(log) {
    this.attachedLogs.push(log);
  },
  log: function(text, level, silent) {
    if(!level) {
      level = 0;
    }
    var currentTurn = this.currentTurn; // I feel dirty for this global ref >_<
    this.logFile.unshift({turn: currentTurn, text: text, level: level});
    window.tr.log.unshift({turn: currentTurn, text: text, level: level});
    if(!silent) {
      console.log(text);
    }
    for(var n in this.attachedLogs) {
      this.attachedLogs[n].log(text, level, true);
    }
  },
  getLastLogEntries: function(n) {
    if(!n) {
      n = 10;
    }
    var lastEvents = [];
    for(var i = 0; i < n; i++) {
      lastEvents.push(this.logFile[i])
    }
    return lastEvents;
  },
  getTurnLogEntries: function(n) {
    var turnEvents = [];
    for(var i = 0, l = this.logFile.length; i < l; i++) {
      if(this.logFile[i].turn === n)
        turnEvents.push(this.logFile[i])
    }
    return turnEvents;
  }
}
