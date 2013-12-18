window.tr = window.tr || {};
window.tr.models = window.tr.models || {};
window.tr.app = window.tr.app || {};
window.tr.app.persons = {};
window.tr.models.Person = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  // tr.utils.extend.call(this, tr.utils.Loggable);
  tr.utils.extend.call(this, tr.utils.Stats);
  tr.utils.extend.call(this, tr.utils.Conversation);
  tr.utils.extend.call(this, tr.utils.PersonEvent)
  this.initialize();
}

window.tr.models.Person.prototype = {
  money: 1000,

  scoutLevel: 3,

  productDesign: 0,
  visualDesign: 0,

  architecture: 0,
  backend: 0,
  frontend: 0,
  operations: 0,
  qa: 0,

  business: 0,
  marketing: 0,

  scouting: 0,
  negotiation: 0,
  sociability: 0,
  learning: 0,
  workEthics: 0,
  attention: 0,

  happiness: 50,
  stress: 50,

  experience: 0,
  desiredWage: 25000,
  currentWage: 0,

  projectKnowledge: [],
  learned: {},

  hypeable: 0,
  followers: 0,

  beingScouted: false,
  isRecruiter: false,

  interviews: 0,
  companyShare: 0,

  bugModificator: 1,
  detailModificator: 1,

  happinessFromWork: 0,

  hasBeenFired: false,
  turnModificator: 1,

  workToStats: {
    "design": "visualDesign",
    "definition": "productDesign",
    "front": "frontend",
    "back": "backend",
    "architecture": "architecture",
    "operations": "operations"
  },

  initialize: function() {
    this.name = this.options.name;
    this.conversationFlags = {};
    this.culture = tr.utils.getRandomCulture();

    this.DNA = new tr.models.DNA(this);
    if(!this.name) {
      this.name = tr.utils.nameGenerator(this.culture, this.DNA.get('sex'));
    }
    this.perks = [];
    this.currentProjects = [];
    this.projectKnowledge = {}
    this.positions = [];
    this.hobbies = [];
    this.socialCircle = {};
    this.companyOpinions = {};
    this.friends = [];
    this.id = tr.randInt(1000000);
    tr.app.persons[this.id] = this;
  },

  resetStats: function() {
    this.perks = [];
    this.productDesign = 1;
    this.visualDesign = 1;

    this.architecture = 1;
    this.backend = 1;
    this.frontend = 1;
    this.operations = 1;
    this.qa = 1;

    this.business = 1;
    this.marketing = 1;
  },

  addPerk: function(perkName) {
    if(this.perks.indexOf(perkName) >= 0) {
      return false;
    }
    this.perks.push(perkName);
    return true;
  },

  randomize: function() {
    this.randomizeInterest();
    this.randomizePersonalStats();
    this.randomizeStudies();
    this.randomizeExperience();
    this.randomizeHobbies();
  },
  pronoum: function() {
    if(this.DNA.get('sex')) {
      return 'she'
    } else {
      return 'he'
    }
  },
  randomizeHobbies: function() {
    this.hobbies = [];
    var amount = 3 + tr.randInt(3);
    for(var i = 0; i < amount; i++) {
      var hobbie = tr.hobbies[tr.randInt(tr.hobbies.length)];
      if(this.hobbies.indexOf(hobbie) < 0) {
        this.hobbies.push(hobbie)
      }
    }
  },
  learn: function(skillName) {
    if(!this.learned[skillName]) {
      this.learned[skillName] = 0;
    }
    this.learned[skillName] += tr.randInt(this.learning) / 100;
    if(this.learned[skillName] >= this[skillName] * 3) {
      this.improveSkill(skillName);
    }
  },
  improveSkill: function(skillName) {
    this.learned[skillName] = 0;
    this[skillName]++;
    this.trigger('conversation', 'I have improved my '+skillName+' skill');
    this.company.addNotification({
      text: this.name+" has improved his skills on "+skillName,
      type: "person",
      id: this.id,
      open: false
    })
  },
  randomizeStudies: function() {
  },
  selfTaught: function() {
    this.perks.push('selfTaught');
    this.increaseStat('business', tr.randInt(30));
    this.increaseStat('architecture',  tr.randInt(30));
    this.increaseStat('backend',  tr.randInt(30));
    this.increaseStat('frontend',  tr.randInt(30));
    this.increaseStat('operations',  tr.randInt(30));
    this.increaseStat('visualDesign',  tr.randInt(30));
    this.increaseStat('productDesign',  tr.randInt(30));
  },
  randomizeInterest:function() {
    var interests = ['business', 'engineering', 'design']
    this.mainInterest = interests[Math.floor(Math.random() * interests.length)]
    tr.utils.extend.call(this, tr.decorators[this.mainInterest]);
  },

  setInterest: function(interest) {
    this.mainInterest = interest;
    tr.utils.extend.call(this, tr.decorators[this.mainInterest]);
  },

  randomizePersonalStats: function() {
    this.negotiation = 1+tr.randInt(100);
    this.scouting = 1+tr.randInt(100);
    this.sociability = 1+tr.randInt(100);
    this.learning = tr.randInt(90) + 10;
    this.attention = 1+tr.randInt(100);
    this.workEthics = 1+tr.randInt(100);
    this.hypeable = 1+tr.randInt(100);
    if(tr.randInt() < 10) {
      this.perks.push('nerdy');
      this.increaseStat('learning', 20);
      this.increaseStat('sociability', -20);
    }
    if(tr.randInt() < 10) {
      this.perks.push('elocuent');
      this.increaseStat('negotiation', 10);
      this.increaseStat('sociability', 5);
    }
    if(tr.randInt() < 10) {
      this.perks.push('shy');
      this.increaseStat('negotiation', -5);
      this.increaseStat('sociability', -10);
    }
    if(tr.randInt() < 10) {
      this.perks.push('elocuent');
      this.increaseStat('negotiation', 10);
      this.increaseStat('sociability', 10);
      this.increaseStat('learning', -5);
    }

  },

  randomizeExperience: function() {

  },
  randomizePerks: function() {
  },
  resolveConversations: function() {

  },

  turn: function(turnNumber) {
    this.currentTurn = turnNumber;
    if(this.isBeingFired) {
      this.company.firePerson(this);
    }
    this.resolveConversations();
    this.stayAtHome = false;
    this.eventChance();
    this.talkedToSomeone = false;
    this.currentTurn = turnNumber;
    this.scoutStats();
    this.coolRelations();
    if(this.stayAtHome) {
      this.hours = [];
      return;
    }
    if(this.negotiatingOffer) {
      this.log(this.name + ' is negotiation with ' + this.negotiatingOffer.investor.name);
    } else {
      this.dailySchedule();
    }
    this.updateHappiness();
    this.updateOffers();
    this.turnModificator = 1;
  },
  updateHappiness: function() {
    this.happiness -= 0.1;
    if(this.stress > this.workEthics) {
      this.happiness -= 0.2;
    }
    this.getHappinessFromWork();
    this.getHappinessFromConversations();
  },
  getHappinessFromConversations: function() {
    if(!this.talkedToSomeone) {
      if(tr.randInt() < 20) {
        if(tr.randInt() < this.sociability) {
          this.happines -= 0.1;
          this.trigger('conversation', "I don't like to be so isolated, I want to socialize")
        }
      }
    }
  },
  getHappinessFromWork: function() {
    this.happines += this.happinessFromWork;
    this.happinessFromWork = 0;
    // for(var n in this.proje)
  },
  dailySchedule: function() {
    this.dayBusinessContact = false;
    var workHours = 0;
    var workForce = (this.happiness + this.workEthics + this.stress) / 300;
    workHours = 7 + (5 * workForce);
    var hours = [];
    for(var i = 0; i < workHours; i++) {
      var slackingProbability = this.sociability/2 - this.stress + 100 - this.workEthics;
      if(tr.randInt() < slackingProbability) {
        hours.push('social')
      } else if(this.isRecruiter && tr.randInt() < 20) {
        if(this.company.beingScouted.length > 0) {
          var choosen = tr.randInt(this.company.beingScouted.length);
          var candidate = this.company.beingScouted[choosen];
          if(!candidate.lastInterview || this.company.currentTurn - candidate.lastInterview > 3) {
            candidate.interview(this, this.company.currentTurn);
          }
        }
      } else {
        if(!this.currentProjects.length) {
          if(this.raisingFunds) {
            if(tr.randInt() < 50) {
              this.learn('business');
            } else {
              this.learn('marketing');
            }
            hours.push(this.getRaisingFundsHour())
          } else {
            hours.push(this.emptyHour());
          }
        } else {
          hours.push(this.projectHour());
        }
      }
    }
    this.hours = hours;
    return hours;
  },
  getRaisingFundsHour: function() {
    // console.log(this.business, this.social)
    if(tr.randInt() < this.business &&
      tr.randInt() < this.sociability &&
      !this.dayBusinessContact) {
      this.dayBusinessContact = true;
      var nInvestors = this.company.availableInvestors.length;
      var objetiveInvestor = this.company.availableInvestors[tr.randInt(nInvestors)];
      this.learn('marketing');
      this.trigger('conversation', "I'm doing a demo of our product to "+objetiveInvestor.name);
      objetiveInvestor.getADemo(this);
      return 'business'
    } else {
      return 'none';
    }
  },
  emptyHour: function() {
    return 'none';
  },
  projectHour: function() {
    var nProjects = this.currentProjects.length;
    return this.currentProjects[tr.randInt(nProjects)].name;
  },

  toJSON: function() {
    var json = {};
    for(var n in this) {
      if(typeof this[n] != "function" && typeof this[n] != "Object") {
        if(this[n].join) {
          json[n] = this[n].join(', ')
        } else {
          json[n] = this[n];
        }
      }
    }
    return json;
  },

  assignPosition: function(position) {
    if(position === 'funds') {
      this.assignRaiseFunds();
    } else if(position === 'marketing') {
      this.assignMarketing();
    } else {
      this.raisingFunds = false;
      this.marketingStaff = false;
      var positions = ['funds', 'front', 'back', 'architecture', 'operations', 'visualDesign', 'productDesign', 'qa'];
      if(positions.indexOf(position) < 0) {
        return;
      } else {
        this.removePosition(position);
        this.positions.push(position);
      }
    }
    this.trigger('change');
  },

  removePosition: function(position) {
    if(position === 'funds') {
      this.raisingFunds = false;
    } else if(position === 'marketing') {
      this.marketingStaff = false;
    } else {
      var p = this.positions.indexOf(position);
      if(p >= 0)
        this.positions.splice(p,1);
    };
    this.trigger('change');
  },
  getRandomProjectKnowledge: function() {
    var projects = [];
    // if(this.company && this.company.human) debugger;
    for(var n in this.projectKnowledge) {
      projects.push(n);
    }
    if(projects.length === 0) {
      return false;
    }
    var randomN = tr.randInt(projects.length);
    return this.projectKnowledge[projects[randomN]];
  },
  increaseProjectKnowledge: function(project, amount) {
    if(!this.projectKnowledge[project.id] ) {
      this.projectKnowledge[project.id] = 0;
    }
    this.projectKnowledge[project.id] += amount;
    if(this.projectKnowledge[project.id] > 100 ) {
      this.projectKnowledge[project.id] = 100;
    } else if(this.projectKnowledge[project.id] < 0 ) {
      this.projectKnowledge[project.id] = 0;
    }
  },
  getHourlyWork: function(project) {
    var position = '';
    var bugModificator = this.bugModificator;
    var detailModificator = this.detailModificator * this.turnModificator;
    this.increaseProjectKnowledge(project, 1 * Math.random() * (50 + this.learning) / 200);
    if(this.positions.length > 0) {
      var p = tr.randInt(this.positions.length);
      position = this.positions[p];
    }
    if(position === 'front') {
      if(this.perks.indexOf('frontender') >= 0) {
        this.happinessFromWork += 0.01;
      }
      this.learn('front');
      return {
        front: detailModificator * 2 * (this.frontend/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        design: 0.5 * (this.visualDesign/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        definition: 0.5 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        bugs: bugModificator * Math.floor(2 * ((100-this.attention) / 100) * Math.random())
      }
    }
    if(position === 'back') {
      if(this.perks.indexOf('backman') >= 0) {
        this.happinessFromWork += 0.01;
      }
      this.learn('back');
      return {
        back:  detailModificator * 2 * (this.backend/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        architecture: 0.5 * (this.architecture/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        definition: 0.5 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        bugs:  bugModificator * Math.floor(2 * ((100-this.attention) / 100) * Math.random())
      }
    }
    if(position === 'architecture') {
      this.learn('architecture');
      return {
        architecture: 2 * (this.architecture/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        definition: 0.5 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        operations: 0.5 * (this.operations/200  + this.stress/200) * this.projectKnowledge[project.id] / 100
      }
    }
    if(position === 'operations') {
      this.learn('operations');
      if(this.perks.indexOf('devops') >= 0) {
        this.happinessFromWork += 0.01;
      }
      return {
        operations: 2 * (this.operations/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        back:  detailModificator *  detailModificator * 0.5 * (this.back/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        architecture: 0.5 * (this.architecture/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        bugs:  bugModificator * Math.floor(2 * ((100-this.attention) / 100) * Math.random())

      }
    }
    if(position === 'visualDesign') {
      this.learn('visualDesign');
      return {
        front: detailModificator *  0.5 * (this.frontend/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        design: 2 * (this.visualDesign/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        definition: 0.5 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge[project.id] / 100
      }
    }
    if(position === 'productDesign') {
      this.learn('productDesign');
      if(this.perks.indexOf('ux') >= 0) {
        this.happinessFromWork += 0.01;
      }
      return {
        design: 1 * (this.visualDesign/200  + this.stress/200) * this.projectKnowledge[project.id] / 100,
        definition: 2 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge[project.id] / 100
      }
    }
    if(position === 'qa') {
      this.learn('qa');
      if(this.perks.indexOf('qa') >= 0) {
        this.happinessFromWork += 0.01;
      }
      return {
        qa: 1 * (this.qa + this.stress + this.workEthics) / 3 * this.projectKnowledge[project.id] / 100
      }
    }
    return {
      design: 0.5 * (this.visualDesign/200  + this.stress/200) * this.projectKnowledge[project.id]/ 100,
      definition: 0.5 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge[project.id]/ 100,
      operations: 0.5 * (this.operations/200  + this.stress/200) * this.projectKnowledge[project.id]/ 100,
      back:  detailModificator * 0.5 * (this.backend/200  + this.stress/200) * this.projectKnowledge[project.id]/ 100,
      architecture: 0.5 * (this.architecture/200  + this.stress/200) * this.projectKnowledge[project.id]/ 100,
      front:  detailModificator * 0.5 * (this.frontend/200  + this.stress/200) * this.projectKnowledge[project.id]/ 100,
      bugs:  bugModificator * Math.floor(2 * ((100-this.attention) / 100) * Math.random())
    }
  },

  socialize: function(others) {
    for(var n in others) {
      if(others[n].id != this.id) {
        this.talkTo(others[n])
      }
    }
  },
  talkTo: function(person) {
    this.talkedToSomeone = true
    var sharedInterests = this.getSharedInterests(person);
    this.socialCircle[person.id] = this.socialCircle[person.id] || 0;
    var conversationQuality = 0.1 * sharedInterests + 0.1 * person.sociability /100;
    this.happiness += 0.1 * this.sociability / 100;
    if(conversationQuality > 0.3) {
      this.happiness += 0.1 * this.sociability / 100;
      if(person.happiness < 25) {
        this.happines -= 0.2 * this.sociability / 100;
        this.trigger('conversation', 'I had a little depressing conversation with ' + person.name);
      } else {
        this.trigger('conversation', 'I had a great conversation with ' + person.name);
      }
    }
    this.socialCircle[person.id] += conversationQuality;
    this.log(this.name + ' enjoyed a good conversation with ' + person.name, 1, true);
    // this.trigger('conversation', 'I have socialized with ' + person.name);
    if(this.socialCircle[person.id] > 50 && tr.randInt() < this.socialCircle[person.id]) {
      if(this.friends.indexOf(person.id) < 0) {
        this.friends.push(person.id);
        this.happiness += 5 * this.sociability / 100;
        this.increaseStat('sociability', 3);
        this.log(this.name + ' is now friend of ' + person.name);
        this.trigger('conversation', "I'm now friend of "+person.name);
        this.company.log(this.name + ' is now friend of ' + person.name);
      }
    }
  },

  getSharedInterests: function(other) {
    var sharedInterests = 0;
    for(var m in this.perks) {
      if(other.perks.indexOf(this.perks[m]) >= 0) {
        sharedInterests++;
      }
    }
    for(var h in this.hobbies) {
      if(other.hobbies.indexOf(this.hobbies[h]) >= 0) {
        sharedInterests++;
      }
    }
    return sharedInterests;
  },
  coolRelations: function() {
    for(var n in this.socialCircle) {
      this.socialCircle[n] -= 0.03;
      if(this.socialCircle[n] < 0) {
        this.socialCircle[n] = 0;
      }
    }
  },
  getSocialJSON: function() {
    var rels = [];
    for(var n in this.socialCircle) {
      var rel = {
        name: tr.app.persons[n].name,
        value: this.socialCircle[n]
      }
      rels.push(rel);
    }
    return rels;
  },
  addProject: function(project) {
    this.currentProjects.push(project)
    this.raisingFunds = false;
  },
  assignRaiseFunds: function() {
    this.positions = [];
    for(var n in this.currentProjects) {
      this.currentProjects[n].removePerson(this);
    }
    this.marketingStaff = false;
    this.raisingFunds = true;
  },
  assignMarketing: function() {
    this.positions = [];
    for(var n in this.currentProjects) {
      this.currentProjects[n].removePerson(this);
    }
    this.raisingFunds = false;
    this.marketingStaff = true;
  },
  negotiateOffer: function(offer) {
    if(offer.negotiator) {
      offer.negotiator.negotiatingOffer = null;
    }
    offer.negotiator = this;
    this.negotiatingOffer = offer;
  },
  perceptionOfTheCompany: function(company) {
    var perception = 0;
    // hype
    var hype = (company.hype + this.hypeable) / 2;
    // friends opinion
    perception += hype;

    if(!this.company) {
      perception += 30;
    }
    if(this.experience == 0) {
      perception += 30;
    } else if(this.experience <= 2) {
      perception += 15;
    }

    if(this.interviews > 0 && this.interviews < 1 + Math.floor(this.socialbility / 10)) {
      perception += this.interviews * 5;
    }
    if(this.interviews >= 1 + Math.floor(this.socialbility / 10)) {
      perception -= this.interviews * 2;
    }

    if(this.founder) {
      if(company === this.company) {
        perception += 50;
      } else {
        perception -= 50;
      }
    }

    return perception;
  },
  desiredWageForCompany: function(company) {
    var modificator = 1.5 - this.perceptionOfTheCompany(company) / 100;
    return Math.floor(this.desiredWage * modificator);
  },
  getOffer: function(amount, share, company) {
    this.log(this.name + ' has received an offer from '+company.name);
    var desiredCompanyWage = this.desiredWageForCompany(company);
    var shareValue = company.companyValue * share;
    if(shareValue + amount > desiredCompanyWage) {
      this.acceptOffer(amount, share, company)
    } else {
      if(desiredCompanyWage * 0.75 < shareValue + amount) {
        this.negotiateWorkOffer(amount, share, company);
      } else {
        this.rejectOffer(amount, share, company);
      }
    }
  },
  acceptOffer: function(amount, share, company) {
    this.acceptingOffer = {
      amount: amount,
      share: share,
      company: company
    }
    this.log(this.name + ' is going to hire by '+company.name);
    this.increaseStat('happiness', 40);
  },
  negotiateWorkOffer: function(amount, share, company) {
    this.negotiatingWorkOffer = {
      amount: amount,
      share: share,
      company: company
    }
  },
  rejectOffer: function(amount, share, company) {
    this.rejectingOfferOf = company;
    this.log(this.name + ' is going to reject the offer by '+company.name);
  },
  updateOffers: function() {
    if(this.acceptingOffer) {
      if(this.acceptingOffer.company.transferOwnShare(this.acceptingOffer.share, this)) {
        this.acceptingOffer.company.addPerson(this);
        this.currentWage = this.acceptingOffer.amount;
      } else {
        this.rejectOffer(0,0,this.acceptingOffer.company);
      }
      this.acceptingOffer = undefined;
    } else if(this.rejectingOfferOf) {
      this.rejectingOfferOf.log(this.name + ' has rejected the offer of the company')
      this.rejectingOfferOf.addNotification({
        text: this.name+" has rejected your offer and "+this.pronoum() + ' not interested in continue with the negociation',
        type: "person",
        id: this.id,
        open: false
      })
      this.rejectingOfferOf = undefined;
    } else if(this.negotiatingWorkOffer) {
      this.negotiatingWorkOffer.company.log(this.name + ' thinks that your offer ('+ this.negotiatingWorkOffer.amount+'$) is too low, but interesting');
      this.negotiatingWorkOffer.company.addNotification({
        text: this.name+" is interested in your offer, but " + this.pronoum() + " thinks that is still too low",
        type: "person",
        id: this.id,
        open: true
      })
      this.negotiatingWorkOffer = undefined;
    }
  },
  getStat: function(attribute) {
    var value = this[attribute];
    var level1 = ['abysmal', 'very bad', 'quite bad', 'mediocre', 'competent', 'quite good', 'good', 'very good', 'world-class', 'world-class']
    var level2 = ['bad', 'bellow average', 'adecuate', 'excellent', 'master']
    var level3 = ['incompetent', 'competent', 'very competent']
    if(this.scoutLevel === 0) {
      return value;
    } else if(this.scoutLevel === 1) {
      value = level1[Math.floor(value / 10)]
    } else if(this.scoutLevel === 2) {
      value = level2[Math.floor(value / 20)]
    } else if(this.scoutLevel === 3) {
      value = level3[Math.floor(value / 35)]
    }
    return value;
  },
  scoutStats: function() {
    if(this.company && this.company.human && this.scoutLevel > 0 && tr.randInt() < 10) {
      this.scoutLevel--;
      this.company.log('Our knowledge about '+ this.name+' competence rises')
    }
  },
  interview: function(other, companyTurn) {
    var company = other.company;
    other.trigger('conversation', 'I have interviewed '+this.name);
    this.lastInterview = companyTurn;
    if(this.perceptionOfTheCompany(company) < 30) {
      company.log(this.name+' has declined our invitation to get interviewed');
    } else {
      this.interviews++;
      if(this.scoutLevel <= 0 ||
        (other.mainInterest != this.mainInterest && this.scoutLevel <= 1)
      ) {
        company.log(other.name+ ' has interviewed '+this.name+', but we know everything we can about him/her');
        company.addNotification({
          text: "With our current resources, we can't improve our knowledge about "+this.name+" skills. Continuing with the interviews will only produce annoyances on both sides",
          type: "person",
          id: this.id,
          open: false
        })
      } else {
        var randomInt = tr.randInt();
        if(other.mainInterest == this.mainInterest) {
          randomInt = randomInt/2;
        }
        if(randomInt < other.scouting) {
          this.scoutLevel--;
          company.log(other.name+ ' is making interviews. Now we know a little more about '+this.name);
          company.addNotification({
            text: "We have interviewed "+this.name+" and learned a little about "+this.pronoum()+" skills",
            type: "person",
            id: this.id,
            open: false
          })
        } else {
          company.log(other.name+ ' has interviewed '+this.name+', but the meeting wasnt very productive');
        }
      }
    }
  },
  log: function(data) {

  },
  export: function() {
    var json = {}
    for(var n in this) {
      if(this[n].export) {

        json[n] = this[n].export();
      } else if(typeof this[n] !== 'object' && typeof this[n] !== 'function') {
        json[n] = this[n]
      }
    }
    var arrays = ['proyectKnowledge', 'perks', 'positions', 'hobbies', 'socialCircle', 'friends']
    for(var m in arrays) {
      var propName = arrays[m];
      json[propName] = [];
      for(var o in this[propName]) {
        json[propName].push(this[propName][o]);
      }
    }
    json.DNA = this.DNA.export();

    return json;
  },
  import: function(json) {

    for(var n in json) {
      if(typeof json[n] !== 'object') {
        this[n] = json[n];
      }
    }
    var arrays = ['proyectKnowledge', 'perks', 'positions', 'hobbies', 'socialCircle', 'friends']
    for(var m in arrays) {
      var propName = arrays[m];
      this[propName] = [];
      for(var o in this[propName]) {
        this[propName].push(json[propName][o]);
      }
    }
    this.DNA.import(json.DNA)
  },
  reactToFiring: function(person) {
    for(var n in this.socialCircle) {
      if(person.id === n) {
        var change = tr.randInt(this.socialCircle[n]);
        this.happiness -= change;
        if(change > 5) {
          this.trigger('conversation', "I'm upset for the firing of "+person.name);
        }
        if(change > 15) {
          this.company.addNotification({
            text: this.name+" is very upset because the firing of "+person.name,
            type: "person",
            id: this.id,
            open: false
          })
        }
      }
    }
  },
  fire: function() {
    this.isBeingFired = true;
    this.trigger('conversation', "Shit... I'll begin to pick my stuff.")
    this.company.addNotification({
      text: this.name+" is being fired. "+this.pronoum() + " doens't work for the company anymore.",
      type: "person",
      id: this.id,
      open: true
    })
  },
  beingFired: function(company) {
    this.isBeingFired = false;
    if(company.human) {
      this.hasBeenFired = true;
    }
    if(!this.companyOpinions[company.id]) {
      this.companyOpinions[company.id] = -50;
    } else {
      this.companyOpinions[company.id] -= 50;
    }
  }
}
