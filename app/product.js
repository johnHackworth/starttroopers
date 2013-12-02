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
  openToPublic: false,
  hype: 0,
  initialize: function() {
    this.name = this.options.name;
    this.modules = [];
    this.visits = [];
    this.newUsers = [];
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
  },
  getAverageQuality: function() {
    var quality = 0;
    var i = 0;
    for(var n in this.modules) {
      if(this.modules[n].released) {
        i += this.modules[n].weight;
        quality = this.modules[n].quality;
      }
    }
    if(i>0) {
      quality = 100 * quality / i;
    }
    return quality;
  },
  addHype: function(quality) {
    this.company.addHype(quality/50);
  }
};
