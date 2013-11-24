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
  "Accelerando Co"
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
  }
}
