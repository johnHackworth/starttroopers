window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Product = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  this.world = this.options.world;
  this.initialize();
}

window.tr.models.Product.prototype = {
  bugsOnTheWild: 0,
  globalQuality: 0,
  globalDesign: 0,
  marketingPunch: 100,
  currentTurn: 0,
  initialize: function() {
    this.name = this.options.name;
    this.modules = [];
  },
  defineSocialNetwork: function() {
    tr.utils.extend.call(this, tr.products.SocialNetwork)
  },
  createModule: function(project) {
    var module = new tr.models.ProductModule({
      name: project.name,
      product: this,
      project: project
    });
    project.productModule = module;
    this.modules.push(module);
    this.trigger('change')
  },
  setCompany: function(company) {
    this.company = company;
  },
  turn: function(currentTurn) {
    this.currentTurn = currentTurn;
    var turnPunch = Math.floor(this.marketingPunch / 10);
    this.marketingPunch -= turnPunch;
    this.world.distributeMarketingPunch(turnPunch, [])
  }
};
