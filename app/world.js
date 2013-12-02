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
  TOTAL_PEOPLE: 1500,
  currentTurn: 0,
  initialize: function() {
    this.workOffers = [];
    this.createInvestors();
    this.createPOPs();
    this.createPeople();
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
    this.company.addPerson(this.people[0])
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
    var newUsers = 0;
    for(var q in this.POPs) {
      this.POPs[q].turn(this.currentTurn);
      visits += this.POPs[q].getVisits();
      newUsers += this.POPs[q].newUsers;
    }
    for(var o in this.people) {
      this.people[o].turn();
    }
    this.createUserAccounts();
    this.company.product.visits.push(visits);
    this.company.product.newUsers.push(newUsers);
    this.workOffersEvaluation();
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
  },
  createPeople: function() {
    this.people = []
    for(var i = 0; i < this.TOTAL_PEOPLE; i++) {
      var p = new window.tr.models.Person({});
      p.randomize();
      this.people.push(p);
    }
  },
  publishWorkOffer: function(options, company) {
    var offer = {
      type: options.type,
      company: company,
      minExperience: options.minExperience,
      published: this.currentTurn,
      id: tr.randInt(1000000),
      curriculae: []
    }
    if(options.maxWage && options.maxWage != 'none') {
      offer.maxWage = options.maxWage;
    }
    this.workOffers.push(offer)
  },
  removeWorkOffer: function(id) {
    for(var n in this.workOffers) {
      if(this.workOffers[n].id === id) {
        this.workOffers.splice(n, 1);
        return true;
      }
    }
    return false;
  },
  workOffersEvaluation: function() {
    for(var n in this.workOffers) {
      var reach = tr.randInt(4);
      for(var m = 0; m < reach; m++) {
        var company = this.workOffers[n].company;
        var randomPerson = tr.randInt(this.TOTAL_PEOPLE);
        var person = this.people[randomPerson];
        console.log(person.perceptionOfTheCompany(this.workOffers[n].company),
          person.experience + ':' +this.workOffers[n].minExperience,
          person.mainInterest + ':' + this.workOffers[n].type,
          person.desiredWageForCompany(company) + ':' + this.workOffers[n].maxWage
        );
        console.log(person.perceptionOfTheCompany(this.workOffers[n].company) > 40,
          person.experience >= this.workOffers[n].minExperience,
          person.mainInterest === this.workOffers[n].type,
          (
            !this.workOffers[n].maxWage ||
            this.workOffers[n].maxWage >= person.desiredWageForCompany(company)
            )
          )
        if(person.perceptionOfTheCompany(this.workOffers[n].company) > 40 &&
          person.experience >= this.workOffers[n].minExperience &&
          person.mainInterest === this.workOffers[n].type &&
          (
            !this.workOffers[n].maxWage ||
            this.workOffers[n].maxWage >= person.desiredWageForCompany(company)
            )
          ) {
          console.log('cv')
          if(this.workOffers[n].curriculae.indexOf(person) < 0) {
            this.workOffers[n].curriculae.push(person);
          }
        }
      }
    }
  }
}
