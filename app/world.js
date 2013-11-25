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
    for(var q in this.POPs) {
      this.POPs[q].turn(this.currentTurn);
    }
  }
}
