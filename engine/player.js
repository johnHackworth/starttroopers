window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Player = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);

  this.initialize();
}

window.tr.models.Player.prototype = {
  initialize: function() {
    this.name = this.options.name;
  }
}
