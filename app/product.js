window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Product = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  this.initialize();
}

window.tr.models.Product.prototype = {
  initialize: function() {
    this.name = this.options.name;
    this.phases = []
    this.people = [];
    this.initPhases();
  },
}
