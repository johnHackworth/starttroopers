window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Investor = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  tr.utils.extend.call(this, tr.utils.Stats);
  tr.utils.extend.call(this, tr.utils.Exportable);
  this.initialize();
};

window.tr.models.Investor.prototype = {
  cash: 10000000,
  currentTurn: 0,
  companyShareOwned: 0,
  knowledgeAboutTheCompany: 0,
  companyPerception: 0,
  hypeAboutTheCompany: 0,
  negotiation: 0,
  hypeable: 0,
  impulsive: 0,
  lastDemo: 0,
  lastBought: -100,
  initialize: function() {
    this.name = this.options.name;
    this.people = [];
    this.offers = [];
    this.cash = 500000 + tr.randInt(this.cash);
    this.negotiation = 50 + tr.randInt(50);
    this.impulsive = tr.randInt(100);
    this.hypeable = tr.randInt(100);
  },
  setCompany: function(company) {
    this.company = company;
  },
  turn: function() {
    this.currentTurn++;
    this.increaseStat('hypeAboutTheCompany', -0.1);
    this.increaseStat('knowledgeAboutTheCompany', -0.025);
    this.decideOffers();
    this.negociateOffers();
  },
  getADemo: function(person) {
    if(this.currentTurn - this.lastDemo < 20) {
      return;
    }
    this.lastDemo = this.currentTurn;
    var demoValue = (person.marketing + person.sociability) / 2;
    var howItWhen = tr.randInt(101);
    if(demoValue > howItWhen) {
      if(demoValue / 2 > howItWhen) {
        this.log(this.name + ' are very impressed by a demo of '+person.company.product.name);
        person.log(person.name + ' has made a impressive demo on ' + this.name);
        person.company.log(person.name + ' has made a impressive demo on ' + this.name);

        this.increaseStat('knowledgeAboutTheCompany', 3 + tr.randInt(3));
        this.increaseStat('companyPerception', 1 + tr.randInt(3));
        this.increaseStat('hypeAboutTheCompany', 10 + tr.randInt(10));
      } else if(demoValue > howItWhen) {
        this.log(this.name + ' made an interesting pressentation about '+person.company.product.name);
        person.log(person.name + ' has made a nice demo on ' + this.name);
        person.company.log(person.name + ' has made a nice demo on ' + this.name);

        this.increaseStat('knowledgeAboutTheCompany', 2 + tr.randInt(2));
        this.increaseStat('hypeAboutTheCompany', tr.randInt(10));
        this.increaseStat('companyPerception', 1);
      } else {
        this.log(this.name + ' made an rather dissapointing pressentation about '+person.company.product.name);
        person.log(person.name + ' has made a awful demo on ' + this.name);
        person.company.log(person.name + ' has made a awful demo on ' + this.name);

        this.increaseStat('knowledgeAboutTheCompany', tr.randInt(2));
        this.increaseStat('hypeAboutTheCompany', -1 * tr.randInt(5));
        this.increaseStat('companyPerception', -1);
      }
    }
  },
  isInterested: function() {
    var hypeValue = this.hypeable + this.hypeAboutTheCompany - 100;
    if(hypeValue < 0) hypeValue = 0;
    var knowledgeValue = this.knowledgeAboutTheCompany + this.impulsive - 100;
    if(knowledgeValue < 0) knowledgeValue = 0;
    var interestValue = (hypeValue + knowledgeValue + this.companyPerception) / 3;
    return interestValue;
  },
  makeAnOffer: function(share, price) {
    var investor = this;
    this.offer = this.company.getAnOffer(investor,share, price);
    this.log(this.name + ' has made an offer to fund the company!!');
  },
  decideOffers: function() {
    var interest = this.isInterested();
    if(!this.offer && interest > 50) {
      // interested
      var shareWeCanAfford = this.cash / this.company.companyValue
      if(shareWeCanAfford > 1) shareWeCanAfford = 1
      var amountWeWant = this.company.companyValue * shareWeCanAfford * (interest - 50) / 100;
      var shareWeWant = Math.floor(100 * 100 * amountWeWant / this.company.companyValue) / 100;
      var priceWeWant = Math.floor(tr.randInt(100 - this.negotiation + 50) / 100 * amountWeWant);
      this.makeAnOffer(shareWeWant, priceWeWant)
    }
  },
  negociateOffers: function() {
    if(this.offer && this.offer.negotiation > 100) {
      this.retireOffer();
    }
  },
  retireOffer: function() {
    this.company.retireOffer(this.offer);
    this.offer = null;
    this.companyPerception -= 50;
  },
  completeOffer: function() {
    this.companyShareOwned += this.offer.share;
    this.cash -= this.offer.price;
    this.offer = null;
    this.companyPerception -= 50;
    this.lastBought = this.currentTurn;
  },
  export: function() {
    var json = this.exportToObject();
    return json;
  }
}
