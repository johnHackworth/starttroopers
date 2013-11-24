window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Company = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  this.initialize();
}

window.tr.models.Company.prototype = {
  cash: 100000,
  currentTurn: 0,
  companyValue: 1000000,
  companyOwnShare: 100,
  initialize: function() {
    this.name = this.options.name;
    this.projects = [];
    this.offers = [];
    this.people = [];
    this.availableInvestors = tr.app.director.world.investors;
  },

  turn: function() {
    this.currentTurn++;
    for(var n in this.availableInvestors ) {
      this.availableInvestors[n].turn(this.currentTurn);
    }
    for(var m in this.offers) {
      this.negotiateOffer(this.offers[m]);
    }
    for(var o in this.people ) {
      this.people[o].turn(this.currentTurn);
    }
    this.socialize();
    for(var p in this.projects) {
      this.projects[p].turn(this.currentTurn);
    }
    this.trigger('newTurn')
  },

  socialize: function() {
    var hourly = [];
    for(var i = 0; i < 12; i++) {
      hourly = [];
      for(var n in this.people) {
        if(this.people[n].hours[i] &&
            this.people[n].hours[i] === 'social'
          ) {
          hourly.push(this.people[n]);
        }
      }
      for(var m in hourly) {
        hourly[m].socialize(hourly);
      }
    }
  },

  initProduct: function(options) {
    this.product = new tr.models.Product(options);
    this.product.setCompany(this);
  },

  initProject: function(name) {
    var module = this.product.availableModules[name]
    var project = new tr.models.Project(module);
    project.setCompany(this);
    this.projects.push(project);
  },

  addPerson: function(person) {
    this.people.push(person);
    person.company = this;
  },
  getAnOffer: function(investor, share, price) {
    this.offers.push({
      investor: investor,
      share: share,
      price: price,
      negotiation: 0,
      reduceShare: true,
      improveOffer: true
    });
    this.log(investor.name + ' has made an offer to fund the company!!');
    return this.offers[this.offers.length -1]
  },
  negotiateOffer: function(offer) {
    if(offer.reduceShare && offer.negotiator) {
      if(tr.randInt(offer.negotiator.business) > tr.randInt(offer.investor.negotiation)) {
        var reduction = tr.randInt(20) / 100;
        offer.share = offer.share * (1-reduction);
        offer.price = offer.price * (1-reduction);
        this.log(offer.negotiator.name + ' has managed to reduce the amount of the company that '+offer.investor.name + ' wants to buy')
      }
      offer.negotiation += tr.randInt(10);
    }
    if(offer.improveOffer && offer.negotiator) {
      if(tr.randInt(offer.negotiator.negotiation) > tr.randInt(offer.investor.negotiation)) {
        var improvement = tr.randInt(20) / 100;
        offer.price = offer.price * (1 + improvement)
        this.log(offer.negotiator.name + ' has managed to improve the amount that '+offer.investor.name + ' is offering')
      }
      offer.negotiation += tr.randInt(10);
    }
  },
  retireOffer: function(offer, completed) {
    var nOffer = -1;
    for(var n in this.offers) {
      if(this.offers[n] === offer) {
        nOffer = n;
      }
    }
    if(nOffer >= 0) {
      if(!completed) this.log(offer.investor.name + ' has cancelled the offer for our company');
      if(offer.negotiator) {
        offer.negotiator.negotiatingOffer = null;
      }
      this.offers.splice(nOffer, 1)
    }
  },
  acceptOffer: function(offer) {
    this.cash += offer.price;
    this.companyOwnShare -= offer.share;
    this.log('BIG NEWS! '+ offer.investor.name + ' has bought a '+offer.share+'% of the company');
    offer.investor.completeOffer();
    this.retireOffer(offer, true);
  }

};
