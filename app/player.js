window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Player = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  this.initialize();
}

window.tr.models.Player.prototype = {
  money: 1000,
  initialize: function() {
    this.name = this.options.name;
  },

  turn: function() {
  },
}
