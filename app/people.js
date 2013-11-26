window.tr = window.tr || {};
window.tr.models = window.tr.models || {};
window.tr.app = window.tr.app || {};
window.tr.app.persons = {};

window.tr.models.Person = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  tr.utils.extend.call(this, tr.utils.Stats);
  this.initialize();
}

window.tr.models.Person.prototype = {
  money: 1000,

  productDesign: 0,
  visualDesign: 0,

  architecture: 0,
  backend: 0,
  frontend: 0,
  operations: 0,
  qa: 0,

  business: 0,
  marketing: 0,

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

  projectKnowledge: 0,

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
    this.culture = tr.utils.getRandomCulture();

    this.DNA = new tr.models.DNA(this);
    if(!this.name) {
      this.name = tr.utils.nameGenerator(this.culture, this.DNA.get('sex'));
    }
    this.perks = [];
    this.currentProjects = [];
    this.positions = [];
    this.hobbies = [];
    this.socialCircle = {};
    this.friends = [];
    this.id = tr.randInt(1000000);
    tr.app.persons[this.id] = this;
  },


  randomize: function() {
    this.randomizeInterest();
    this.randomizePersonalStats();
    this.randomizeStudies();
    this.randomizeExperience();
    this.randomizeHobbies();
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

  randomizePersonalStats: function() {
    this.negotiation = tr.randInt(100);
    this.sociability = tr.randInt(100);
    this.learning = tr.randInt(90) + 10;
    this.attention = tr.randInt(100);
    this.workEthics = tr.randInt(100);
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

  turn: function(turnNumber) {
    this.currentTurn = turnNumber;
    this.coolRelations();
    if(this.negotiatingOffer) {
      this.log(this.name + ' is negotiation with ' + this.negotiatingOffer.investor.name);
    } else {
      this.dailySchedule();
    }
    this.updateHappiness();
  },
  updateHappiness: function() {
    this.happiness -= 0.1;
    if(this.stress > this.workEthics) {
      this.happiness -= 0.2;
    }
    this.getHappinessFromWork();
  },
  getHappinessFromWork: function() {

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
      } else {
        if(!this.currentProjects.length) {
          if(this.raisingFunds) {
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
    console.log('raising funds hours', this.dayBusinessContact)
    // console.log(this.business, this.social)
    if(tr.randInt() < this.business &&
      tr.randInt() < this.sociability &&
      !this.dayBusinessContact) {
      this.dayBusinessContact = true;
      var nInvestors = this.company.availableInvestors.length;
      var objetiveInvestor = this.company.availableInvestors[tr.randInt(nInvestors)];
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
      this.assignRaiseFunds ();
    } else {
      this.raisingFunds = false;
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
    } else {
      var p = this.positions.indexOf(position);
      if(p >= 0)
        this.positions.splice(p,1);
    };
    this.trigger('change');
  },

  getHourlyWork: function(project) {
    var position = '';
    this.increaseStat("projectKnowledge", 10 * Math.random() * this.learning / 100);
    if(this.positions.length > 0) {
      var p = tr.randInt(this.positions.length);
      position = this.positions[p];
    }
    if(position === 'front') {
      return {
        front: 2 * (this.frontend/200  + this.stress/200) * this.projectKnowledge / 100,
        design: 0.5 * (this.visualDesign/200  + this.stress/200) * this.projectKnowledge / 100,
        definition: 0.5 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge / 100,
        bugs: Math.floor(2 * ((100-this.attention) / 100) * Math.random())
      }
    }
    if(position === 'back') {
      return {
        back: 2 * (this.backend/200  + this.stress/200) * this.projectKnowledge / 100,
        architecture: 0.5 * (this.architecture/200  + this.stress/200) * this.projectKnowledge / 100,
        definition: 0.5 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge / 100,
        bugs: Math.floor(2 * ((100-this.attention) / 100) * Math.random())
      }
    }
    if(position === 'architecture') {
      return {
        architecture: 2 * (this.architecture/200  + this.stress/200) * this.projectKnowledge / 100,
        definition: 0.5 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge / 100,
        operations: 0.5 * (this.operations/200  + this.stress/200) * this.projectKnowledge / 100
      }
    }
    if(position === 'operations') {
      return {
        operations: 2 * (this.operations/200  + this.stress/200) * this.projectKnowledge / 100,
        back: 0.5 * (this.back/200  + this.stress/200) * this.projectKnowledge / 100,
        architecture: 0.5 * (this.architecture/200  + this.stress/200) * this.projectKnowledge / 100,
        bugs: Math.floor(2 * ((100-this.attention) / 100) * Math.random())

      }
    }
    if(position === 'visualDesign') {
      return {
        front: 0.5 * (this.frontend/200  + this.stress/200) * this.projectKnowledge / 100,
        design: 2 * (this.visualDesign/200  + this.stress/200) * this.projectKnowledge / 100,
        definition: 0.5 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge / 100
      }
    }
    if(position === 'productDesign') {
      return {
        design: 1 * (this.visualDesign/200  + this.stress/200) * this.projectKnowledge / 100,
        definition: 2 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge / 100
      }
    }
    return {

      design: 0.5 * (this.visualDesign/200  + this.stress/200) * this.projectKnowledge / 100,
      definition: 0.5 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge / 100,
      operations: 0.5 * (this.operations/200  + this.stress/200) * this.projectKnowledge / 100,
      back: 0.5 * (this.backend/200  + this.stress/200) * this.projectKnowledge / 100,
      architecture: 0.5 * (this.architecture/200  + this.stress/200) * this.projectKnowledge / 100,
      front: 0.5 * (this.frontend/200  + this.stress/200) * this.projectKnowledge / 100

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
    var sharedInterests = this.getSharedInterests(person);
    this.socialCircle[person.id] = this.socialCircle[person.id] || 0;
    var conversationQuality = 0.1 * sharedInterests + 0.1 * person.sociability /100;
    this.happiness += 0.1 * this.sociability / 100;
    if(conversationQuality > 0.2) {
      this.happiness += 0.1 * this.sociability / 100;
    }
    this.socialCircle[person.id] += conversationQuality;
    this.log(this.name + ' enjoyed a good conversation with ' + person.name, 1, true);
    this.trigger('conversation', 'socialized with ' + person.name);
    if(this.socialCircle[person.id] > 50 && tr.randInt() < this.socialCircle[person.id]) {
      if(this.friends.indexOf(person) < 0) {
        this.friends.push(person);
        this.happiness += 5 * this.sociability / 100;
        this.increaseStat('sociability', 3);
        this.log(this.name + ' is now friend of ' + person.name);
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
      console.log(this.currentProjects[n])
      this.currentProjects[n].removePerson(this);
    }
    this.raisingFunds = true;
  },
  negotiateOffer: function(offer) {
    if(offer.negotiator) {
      offer.negotiator.negotiatingOffer = null;
    }
    offer.negotiator = this;
    this.negotiatingOffer = offer;
  }
}
