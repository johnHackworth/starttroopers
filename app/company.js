window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Company = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  tr.utils.extend.call(this, tr.utils.Stats);

  this.initialize();
}

window.tr.models.Company.prototype = {
  human:true,
  cash: 100000,
  currentTurn: 0,
  companyValue: 1000000,
  companyOwnShare: 100,
  hype: 0,
  initialize: function() {
    this.name = this.options.name || 'the company';
    this.projects = [];
    this.offers = [];
    this.people = [];
    this.beingScouted = [];
    this.world = tr.app.director.world;
    this.availableInvestors = tr.app.director.world.investors;
    this.POPs = tr.app.director.world.POPs;
  },

  publicProducts: function() {
    if(this.product.openToPublic) {
      return this.product;
    } else {
      return null;
    }
  },

  turn: function() {
    this.currentTurn++;
    this.world.turn(this.currentTurn);
    for(var m in this.offers) {
      this.negotiateOffer(this.offers[m]);
    }
    for(var o in this.people ) {
      this.people[o].turn(this.currentTurn);
    }
    this.socialize();
    for(var p in this.projects) {
      this.projects[p].turn(this.currentTurn);
    };
    this.product.turn(this.currentTurn);
    this.actualizeHype();
    this.actualizeFinantial();
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
    if(this.people.indexOf(person) < 0) {
      this.people.push(person);
      person.company = this;
      this.log('The company has signed '+person.name)
      if(person.followers > 500) {
        this.log(person.name + ' is a star on the business')
        this.addHype(person.followers / 500);
      }
      var pos = this.beingScouted.indexOf(person);
      if(pos >= 0) {
        this.beingScouted.splice(pos, 1);
      }
      person.beingScouted = false;
      this.trigger('newHire', person)
    } else {
      this.log('The company signed a new contract with'+person.name)
    }
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
    this.addHype(tr.randInt(5));
  },
  addHype:function(quality) {
    this.increaseStat('hype', quality);
  },
  actualizeHype: function() {
    var hypeVariation = -1 * this.hype * 0.01;
    this.increaseStat('hype', hypeVariation);
  },
  transferOwnShare: function(share, person) {
    if(!share) {
      return true;
    }
    if(this.companyOwnShare - share >= 0) {
      person.companyShare += share;
      this.companyOwnShare -= share;
      this.log(share +'% of the company now belongs to '+person.name);
      return true;
    }
    return false;
  },
  publishWorkOffer: function(options) {
    this.world.publishWorkOffer(options, this);
  },
  removeWorkOffer: function(id) {
    this.world.removeWorkOffer(id);
  },
  actualizeFinantial: function() {
    var date = tr.turnToDate(this.currentTurn)
    if(date.getDate() === 1) {
      this.payWages();
    }
  },
  payWages: function() {
    this.log('Payday!')
    for(var n in this.people) {
      var monthlyPay = this.people[n].currentWage / 12;
      this.cash -= monthlyPay;
      this.people[n].money += monthlyPay;
    }
  }

};
