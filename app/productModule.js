window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.ProductModule = function(options) {
  this.options = options;
  this.product = options.product;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  this.initialize();
};

window.tr.models.ProductModule.prototype = {
  bugsOnTheWild: 0,
  quality: 0,
  design: 0,
  initialize: function() {
    this.name = this.options.name;
  },
};
