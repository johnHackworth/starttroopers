window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Person = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
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

  business: 0,
  marketing: 0,

  negociation: 0,
  sociability: 0,
  learning: 0,
  workEthics: 0,

  hapiness: 50,
  stress: 50,

  experience: 0,
  desiredWage: 25000,

  projectKnowledge: 0,

  initialize: function() {
    this.name = this.options.name;
    if(!this.name) {
      this.name = tr.utils.nameGenerator();
    }
    this.perks = [];
    this.currentProjects = [];
    this.positions = [];
  },

  increaseStat: function(statName, value) {
    this[statName] += value;
    if(this[statName] > 100) {
      this[statName] = 100;
    }
    if(this[statName] < 0) {
      this[statName] = 0;
    }
  },

  randomize: function() {
    this.randomizeInterest();
    this.randomizePersonalStats();
    this.randomizeStudies();
    this.randomizeExperience();
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
    this.negociation = tr.randInt(100);
    this.sociability = tr.randInt(100);
    this.learning = tr.randInt(100);
    this.workEthics = tr.randInt(100);
    if(tr.randInt() < 10) {
      this.perks.push('nerdy');
      this.increaseStat('learning', 20);
      this.increaseStat('sociability', -20);
    }
    if(tr.randInt() < 10) {
      this.perks.push('elocuent');
      this.increaseStat('negociation', 10);
      this.increaseStat('sociability', 5);
    }
    if(tr.randInt() < 10) {
      this.perks.push('shy');
      this.increaseStat('negociation', -5);
      this.increaseStat('sociability', -10);
    }
    if(tr.randInt() < 10) {
      this.perks.push('elocuent');
      this.increaseStat('negociation', 10);
      this.increaseStat('sociability', 10);
      this.increaseStat('learning', -5);
    }

  },

  randomizeExperience: function() {

  },
  randomizePerks: function() {
  },

  turn: function() {
    this.dailySchedule();
  },
  dailySchedule: function() {
    var workHours = 0;
    var workForce = (this.hapiness + this.workEthics + this.stress) / 300;
    workHours = 7 + (5 * workForce);
    var hours = [];
    for(var i = 0; i < workHours; i++) {
      var slackingProbability = this.sociability/2 - this.stress + 100 - this.workEthics;
      if(tr.randInt() < slackingProbability) {
        hours.push('social')
      } else {
        if(!this.currentProjects.length) {
          hours.push(this.emptyHour());
        } else {
          hours.push(this.projectHour());
        }
      }
    }
    this.hours = hours;
    return hours;
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
    var positions = ['front', 'back', 'architecture', 'operations', 'visualDesign', 'productDesign'];
    if(positions.indexOf(position) < 0) {
      return;
    } else {
      this.removePosition(position);
      this.positions.push(position);
    }
  },

  removePosition: function(position) {
    var p = this.positions.indexOf(position);
    if(p >= 0)
      this.positions.splice(p,1);
  },

  getHourlyWork: function(project) {
    var position = '';
    this.increaseStat("projectKnowledge", 10 * Math.random() * this.learning / 100);
    if(this.positions.length > 0) {
      var p = tr.randInt(this.positions.length);
      position = this.positions[p];
    }
    console.log(this.name + ' working as ' + position)
    if(position === 'front') {
      return {
        front: 2 * (this.frontend/200  + this.stress/200) * this.projectKnowledge / 100,
        design: 0.5 * (this.visualDesign/200  + this.stress/200) * this.projectKnowledge / 100,
        definition: 0.5 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge / 100
      }
    }
    if(position === 'back') {
      return {
        back: 2 * (this.backend/200  + this.stress/200) * this.projectKnowledge / 100,
        architecture: 0.5 * (this.architecture/200  + this.stress/200) * this.projectKnowledge / 100,
        definition: 0.5 * (this.productDesign/200  + this.stress/200) * this.projectKnowledge / 100
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
        architecture: 0.5 * (this.architecture/200  + this.stress/200) * this.projectKnowledge / 100
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

}
