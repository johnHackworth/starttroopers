window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.ProductModule = function(options) {
  this.options = options;
  this.product = options.product;
  this.project = options.project;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  this.initialize();
};

window.tr.models.ProductModule.prototype = {
  bugsOnTheWild: 0,
  knowBugsOnTheWild: 0,
  quality: 0,
  design: 0,
  weight: 0,
  released: false,

  maxUsers: 0,
  earlyAdopters: [],
  initialize: function() {
    this.name = this.options.name;
    this.earlyAdopters = [];
  },
  releaseModule: function() {
    this.project.isRefactor = false;
    this.released = true;
    this.maxUsers = this.project.module.maxUsers;
    for(var n in this.project.module.earlyAdopters) {
      this.earlyAdopters.push(this.project.module.earlyAdopters[n]);
    }
    this.product.marketingPunch += this.project.module.marketingPunch;
    this.product.openToPublic = true;
    this.quality = this.project.quality;
    this.weight = this.project.module.weight;
    this.product.addHype(this.quality);
    this.bugsOnTheWild = this.project.bugs;
    this.knowBugsOnTheWild = this.project.knowBugs;

  },
  removeBugs: function() {
    if(this.bugsOnTheWild > 0) {
      this.bugsOnTheWild--;
      this.knowBugsOnTheWild--;
    }
  }
};
