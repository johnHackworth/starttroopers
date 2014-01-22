window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Product = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  tr.utils.extend.call(this, tr.utils.Exportable);
  this.world = this.options.world;
  this.initialize();
}

window.tr.models.Product.prototype = {
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
  isModuleReady: function(id) {
    for(var m in this.modules) {
      if(
        (this.modules[m].released ||
        this.modules[m].project.phase.name === 'test') &&
        this.modules[m].project.id === id) {
        return true;
      }
    }
    return false;
  },
  isModuleGettingReady: function(id) {
    for(var m in this.modules) {
      if(!this.modules[m].released &&
        this.modules[m].project.phase.name != 'test' &&
        this.modules[m].project.id === id) {
        return true;
      }
    }
    return false;
  },
  getAvailableModules: function() {
    var available = [];
    for(var m in this.availableModules) {
      var mod = this.availableModules[m];
      mod.id = m;
      if(!mod.required) {
        available.push(mod)
      } else {
        if(this.isModuleReady(mod.required)) {
          available.push(mod);
        }
      }
    }
    return available;
  },
  getSoonAvailableModules: function() {
    var available = [];
    for(var m in this.availableModules) {
      if(this.isModuleGettingReady(this.availableModules[m].required)) {
        var mod = this.availableModules[m]
        mod.id = m;
        available.push(mod);
      }
    }
    return available;
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
    this.world.distributeMarketingPunch(turnPunch, this.getReleasedInterestGroups());
  },
  getReleasedInterestGroups: function() {
    var adopters = {};
    for(var n in this.modules) {
      if(this.modules[n].released) {
        for(var m in this.modules[n].earlyAdopters) {
          if(!adopters[m]) {
            adopters[m] = 0;
          }
          adopters[m]++;
        }
      }
    }
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
  },
  getBugs: function() {
    var nBugs = 0;
    for(var n in this.modules) {
      if(this.modules[n].released) {
        nBugs += this.modules[n].bugsOnTheWild;
      }
    }
    return nBugs;
  },
  export: function() {
    var json = this.exportToObject(true);
    json.availableModules = this.exportArray('availableModules');
    json.visits = this.exportArray('visits');
    json.modules = this.exportArray('modules');
    json.newUsers = this.exportArray('newUsers');
    return json;
  }
};
