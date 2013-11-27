window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

var fundsNames = [
  "Wyoming Tech Funds",
  "TechInvestors Co.",
  "Investia",
  "Investing Bank of Austria",
  "SeedInvestor",
  "Angel Investor Fund",
  "Nigerian Royal Fund",
  "Seedify Co.",
  "Accelerando Co",
  "S.P.A.C.E. Industries",
  "Combination Funds"
]

window.tr.models.World = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  this.initialize();
}

window.tr.models.World.prototype = {
  initialize: function() {
    this.createInvestors();
    this.createPOPs();
  },
  createInvestors: function() {
    this.investors = [];
    for(var n in fundsNames) {
      var investor = new tr.models.Investor({
        name: fundsNames[n],
        company: tr.app.director.company
      });
      this.investors.push(investor);
    }
  },
  setPlayer: function(company) {
    this.company = company;

    for(var n in this.investors) {
      this.investors[n].setCompany(company);
    }
  },
  createPOPs: function() {
    this.POPs = [];
    var j = 0;
    for(var n in tr.ageGroups) {
      for(var i = 0; i < 5; i++) {
        var POP = new tr.models.POP({ageGroup: tr.ageGroups[n]});
        POP.randomizeSize((6 - n) * 100000);
        this.POPs.push(POP);
      }
      j++;
    }
  },
  turn: function(currentTurn) {
    this.currentTurn = currentTurn;
    for(var n in this.availableInvestors ) {
      this.investors[n].turn(this.currentTurn);
    }
    var visits = 0;
    for(var q in this.POPs) {
      this.POPs[q].turn(this.currentTurn);
      visits += this.POPs[q].getVisits();
    }
    this.createUserAccounts();
    this.company.product.visits.push(visits);

  },
  distributeMarketingPunch: function(amount, hobbies) {
    var popN = this.POPs.length;
    for(var i = tr.randInt(popN); i < amount; i++) {
      this.POPs[i % popN].knowTheProduct += tr.randInt(3);
    }
    for(var j = 0; j < popN; j++) {
      this.POPs[j].trimStats();
    }
  },
  createUserAccounts: function() {
    var product = this.company.publicProducts();
    if(!product) {
      return;
    } else {
      for(var n in this.POPs) {
        this.POPs[n].newProductUsers();
        this.POPs[n].whoLikesTheProduct(product);
      }
    }
  }
}
