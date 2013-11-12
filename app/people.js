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

  initialize: function() {
    this.name = this.options.name;
    if(!this.name) {
      this.name = tr.utils.nameGenerator();
    }
    this.perks = [];
    this.currentProjects = [];
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
    if(this.mainInterest === 'business') {
      if(Math.random() * 100 < 50) {
        this.perks.push('MBA');
        this.increaseStat('business', 30);
        this.desiredWage += 20000;
      } else {
        this.selfTaught()
      }
    } else if(this.mainInterest === 'engineering') {
      if(Math.random() * 100 < 50) {
        this.perks.push('engineering graduate');
        this.increaseStat('architecture', 20);
        this.increaseStat('backend', 15);
        this.increaseStat('frontend', 10);
        this.increaseStat('operations', 5);
        this.desiredWage += 10000;
      } else {
        this.selfTaught()
      }
    } else if(this.mainInterest === 'design') {
      if(Math.random() * 100 < 50) {
        this.perks.push('design school graduate');
        this.increaseStat('visualDesign', 25);
        this.increaseStat('frontend', 5);
        this.increaseStat('productDesign', 15);
        this.desiredWage += 5000;
      } else {
        this.selfTaught()
      }
    }
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
    this.experience = tr.randInt(10);
    var posiblePastJobs = ['enterpreur', 'business', 'front', 'back', 'designer']
    var increase = 0;
    for(var i = 0; i < this.experience; i++) {
      if(this.mainInterest === 'business') {
        if(tr.randInt() > 50) {
          increase = tr.randInt(10 * this.learning / 100);
          this.increaseStat('business', increase)
          this.desiredWage += increase * 1000 * (this.negociation / 100);
        } else {
          increase = tr.randInt(8 * this.learning / 100)
          this.increaseStat('business', increase)
          this.increaseStat('productDesign', tr.randInt(5 * this.learning / 100))
          this.desiredWage += increase * 1000 * (this.negociation / 100);
        }
      }
      if(this.mainInterest === 'design') {
        increase = tr.randInt(10 * this.learning / 100)
        this.increaseStat('productDesign',increase)
        this.increaseStat('visualDesign', tr.randInt(10 * this.learning / 100))
        this.desiredWage += increase * 600 * (this.negociation / 100);
      }
      if(this.mainInterest === 'engineering') {
        var frontAlpha = tr.randInt(10 * this.learning / 100)
        this.increaseStat('frontend', frontAlpha);
        var backAlpha = tr.randInt(10 * this.learning / 100)
        this.increaseStat('backend', backAlpha);
        var archAlpha = tr.randInt(10 * this.learning / 100)
        this.increaseStat('architecture', archAlpha);
        var opAlpha = tr.randInt(10 * this.learning / 100)
        this.increaseStat('operations', opAlpha);
        increase = frontAlpha + backAlpha + archAlpha + opAlpha
        this.desiredWage += increase * 200 * (this.negociation / 100);
      }
      this.randomizePerks();
    }
  },
  randomizePerks: function() {
    if(tr.randInt() < 5) {
      if(this.mainInterest === 'design') {
        var chooseInt = tr.randInt(2);
        if(chooseInt == 0) {
          this.perks.push('UX');
          this.increaseStat('productDesign', 30);
        }
        if(chooseInt == 1) {
          this.perks.push('color theory');
          this.increaseStat('visualDesign', 10);
        }
      }
      if(this.mainInterest === 'engineering') {
        var chooseInt = tr.randInt(3);
        if(chooseInt == 0) {
          this.perks.push('frontender');
          this.increaseStat('frontend', 30);
        }
        if(chooseInt == 1) {
          this.perks.push('back-man');
          this.increaseStat('backend', 30);
        }
        if(chooseInt == 2) {
          this.perks.push('devops');
          this.increaseStat('operations', 30);
        }
      }
    }
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
      var slackingProbability = this.sociability - this.stress + 100 - this.workEthics;
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
  getHourlyWork: function(project) {
    return {
      design: 1,
      front: 1
    }
  }
}
