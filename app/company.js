window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Company = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  tr.utils.extend.call(this, tr.utils.Stats);
  tr.utils.extend.call(this, tr.utils.MarketingEvents)

  this.initialize();
}

window.tr.models.Company.prototype = {
  _MAX_NOTIFICATIONS: 100,
  human:true,
  cash: 500000,
  advertisingBudget: 0,
  infrastructureBudget: 0,
  currentTurn: 0,
  companyValue: 1000000,
  companyOwnShare: 100,
  hype: 0,
  initialize: function() {
    this.id = tr.randInt(1000000);
    this.name = this.options.name || 'the company';
    this.projects = [];
    this.offers = [];
    this.people = [];
    this.notifications = [];
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
    this.socialize();
    for(var p in this.projects) {
      this.projects[p].turn(this.currentTurn);
    };
    this.product.turn(this.currentTurn);
    this.marketingActions();
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
    module.id = name;
    var project = new tr.models.Project(module);
    project.setCompany(this);
    this.projects.push(project);
  },
  leavingCompany: function(person) {
    var index = this.people.indexOf(person);
    if(index >= 0) {
      this.removePerson(person);
      this.reactionToLeaving(person);
      person.company = null;
      this.log('The company has lost '+person.name+' as worker')
      this.addNotification({
        text: person.name + ' has left the company',
        type: 'person',
        id: person.id,
        open: true
      })
      if(person.followers > 500 && tr.randInt() < 20) {
        this.addNotification({
          text: 'the leaving of ' + person.name + ' has created some flame against us on the net.',
          type: 'person',
          id: person.id,
          open: true,
          hint: '-- hype'
        })
        this.addHype((1+tr.randInt(2))/2 * person.followers / 500);
      }
    }
    this.trigger('removePerson', person)
  },
  firePerson: function(person) {
    var index = this.people.indexOf(person);
    if(index >= 0) {
      this.removePerson(person);
      this.reactionToFiring(person);
      person.company = null;
      this.log('The company has fired '+person.name)
      this.addNotification({
        text: person.name + ' has been fired from the company',
        type: 'person',
        id: person.id,
        open: true
      })
      if(person.followers > 500 && tr.randInt() < 20) {
        this.addNotification({
          text: 'the firing of ' + person.name + ' has created some flame against us on the net.',
          type: 'person',
          id: person.id,
          open: true,
          hint: '-- hype'
        })
        this.addHype(-1 * person.followers / 500);
      }
      this.trigger('removePerson', person)
    }
  },
  addPerson: function(person) {
    if(this.people.indexOf(person) < 0) {
      if(this.name === 'the company') {
      }
      if(person.company) {
        person.company.hiredByOther(person, this);
      }
      this.people.push(person);
      person.setCompany(this);
      this.log('The company has signed '+person.name)
      this.addNotification({
        text: person.name + ' has accepted your offer and ' + person.pronoum()+ ' will inmediately begin to work with you',
        type: 'person',
        id: person.id,
        open: true
      })
      if(person.followers > 500) {
        this.log(person.name + ' is a star on the business')
        this.addHype(person.followers / 500);
      }
      var pos = this.beingScouted.indexOf(person);
      if(pos >= 0) {
        this.beingScouted.splice(pos, 1);
      }
      person.beingScouted = false;
      this.autoAddToProjects(person);
      this.trigger('newHire', person)
    } else {
      this.log('The company signed a new contract with'+person.name)
    }
  },
  autoAddToProjects: function(person) {
    for(var n in this.projects) {
      if(this.projects[n].autoAdd) {
        this.projects[n].addPerson(person);
      }
    }
  },
  hiredByOther: function(person, otherCompany) {
    this.removePerson(person);
    this.log(person.name + ' has left the company');
    this.addNotification({
      text: person.name +' has been hired by ' + otherCompany.name + '!!! ' + person.pronoum() + ' will leave your company ASAP',
      type: "people",
      id: person.id,
      open: true
    })
  },
  reactionToFiring: function(person) {
    person.beingFired(this);
    for(var n in this.people) {
      this.people[n].reactToLeaving(person);
    }
  },
  reactionToLeaving: function(person) {
    for(var n in this.people) {
      this.people[n].reactToLeaving(person);
    }
  },
  removePerson: function(person) {
    if(this.people.indexOf(person) >= 0) {
      this.people.splice(this.people.indexOf(person), 1);
    }
    for(var n in this.projects) {
      var pos = this.projects[n].people.indexOf(person);
      if(pos >= 0) {
        this.projects[n].people.splice(pos,1);
      }
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
  marketingActions: function() {
    var marketingPoints = this.getMarketingPoints();
    var marketingEvent = null;
    for(var i = 0; i < marketingPoints; i++) {
      marketingEvent = this.getMarketingEvent();
      if(marketingEvent) {
        return;
      }
    }
  },
  getMarketingEvent: function() {
    this.getMarketingChance(this.marketingLead)
  },
  getMarketingPoints: function() {
    var marketingPoints = 0;
    var sumMarketing = 0;

    for(var n in this.people) {
      if(this.people[n].marketingPoints) {
        this.marketingLead = this.people[n];
        marketingPoints += this.people[n].marketingPoints;
        sumMarketing += this.people[n].marketing;
      }
    }
    var maxPoints = Math.floor(sumMarketing / 50)
    if(maxPoints < 1) {
      maxPoints = 1;
    }
    if(marketingPoints > maxPoints) {
      marketingPoints = maxPoints;
    }
    return marketingPoints;
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
  },

  getPayroll: function() {
    var payroll = 0;
    for(var n in this.people) {
      payroll += this.people[n].currentWage / 12;
    }
    return payroll;
  },
  addNotification: function(options) {
    var notif = {
      'text': options.text,
      'type': options.type,
      'read': false,
      'id': options.id,
      'company': this,
      'options': options.options,
      'autoOpen' : options.open || false,
      'entity': options.entity
    }
    this.notifications.push(notif);
    this.trimNotifications();
    this.trigger('notificationCreated', notif);
  },
  trimNotifications: function() {
    while(this._MAX_NOTIFICATIONS > this.notifications.lenght) {
      this.notifications.shift();
    }
  },
  getUnreadNotifications: function() {
    var num = 0;
    this.notifications.map(function(notif) {
      if(!notif.read) {
        num++;
      }
    })
    return num;
  },
  getRandomPerson: function() {
    var n = tr.randInt(this.people.length);
    return this.people[n];
  },
  getAdvertisingFunds: function() {
    return this.advertisingBudget;
  },
  getInfrastructureFunds: function() {
    return this.infrastructureBudget;
  }
};
