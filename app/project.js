window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Project = function(options) {
  this.module = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  this.initialize();
}

window.tr.models.Project.prototype = {
  bugs: 0,
  launched: false,
  knowBugs: 0,
  projectPhases: ['mvp', 'polish', 'test'],
  initialize: function() {
    this.module.started = true;
    this.name = this.module.name;
    this.phases = []
    this.people = [];
    this.initPhases();

  },
  createPhase: function(name, goals) {
    if(!goals) {
      goals= {
        definitionGoal: 100,
        designGoal: 100,
        backGoal: 100,
        frontGoal: 100,
        architectureGoal: 100,
        operationsGoal: 100
      }
    }
    var phase = {
      name: name,
      definition: 0,
      definitionGoal: goals.definitionGoal,
      design: 0,
      designGoal: goals.designGoal,
      back: 0,
      backGoal: goals.backGoal,
      front: 0,
      frontGoal: goals.frontGoal,
      architecture: 0,
      architectureGoal: goals.architectureGoal,
      operations: 0,
      operationsGoal: goals.operationsGoal,
      bugs: 0
    }
    return phase;
  },
  setCompany: function(company) {
    this.company = company;
    this.attachLog(this.company);
    this.company.product.createModule(this);
  },
  phaseCompletedness: function() {
    var toGo = 0;
    var done = 0;
    var areas = ['design', 'definition', 'front', 'back', 'architecture', 'operations']
    for(var n in areas) {
      // console.log(areas[n])
      toGo += this.phase[areas[n]+'Goal'];
      done += this.phase[areas[n]];
    }
    return 100 * done / toGo;
  },
  initPhases: function() {
    this.phases = {
      mvp: this.createPhase('mvp', this.module.goals),
      polish: this.createPhase('polish',this.module.goals),
      test: this.createPhase('test',this.module.goals)
    }
    this.phase = this.phases.mvp;
  },
  turn: function(turn) {
    this.currentTurn = turn;
    this.getWork();
  },
  addPerson: function(person) {
    if(!this.people.indexOf(person) >= 0) {
      this.people.push(person);
      person.currentProjects.push(this);
    }
  },
  getWork: function() {
    var peopleHours = [];
    for(var i = 0; i < 12; i++) {
      for(var n in this.people) {
        if(this.people[n].hours[i] &&
            this.people[n].hours[i] === this.name
          ) {
          this.addWork(this.people[n]);
          this.people[n].log((i + 8) +':00 hours, ' + this.people[n].name + ' working on ' + this.name, 1, true)
          if(!peopleHours[n]) {
            peopleHours[n] = 0;
          }
          peopleHours[n]++;
        }
      }
    }
    for(var m in this.people) {
      this.log(this.people[m].name + ' worked ' + peopleHours[m] + ' hours on ' + this.name, 1, true)
    }
  },
  addWork: function(person) {
    var hourWork = person.getHourlyWork(this);
    for(var n in hourWork) {
      this.increasePhaseStat(n, hourWork[n]/10);
    }
  },
  increasePhaseStat: function(stat, increase) {
    this.phase[stat] += increase;
    if(this.phase[stat] > this.phase[stat + 'Goal']) {
      this.phase[stat] = this.phase[stat + 'Goal'];
      this.phaseStatCompleted(stat);
    }
  },
  phaseStatCompleted: function(stat) {
    this.trigger('completedStat', stat);
    this.log(stat + ' of ' + this.name + ' completed',2);
    var completed = true;
    if(this.phase.definition < this.phase.definitionGoal) completed = false;
    if(this.phase.design < this.phase.designGoal) completed = false;
    if(this.phase.back < this.phase.backGoal) completed = false;
    if(this.phase.front < this.phase.frontGoal) completed = false;
    if(this.phase.architecture < this.phase.architectureGoal) completed = false;
    if(this.phase.operations < this.phase.operationsGoal) completed = false;
    if(completed) this.phaseCompleted();
  },
  phaseCompleted: function() {
    this.phase.completed = true;
    this.trigger('completedPhase');
    this.log(this.name + ' completed', 2);
  },
  nextPhase: function() {
    if(!this.phase.completed) {
      return this.phase;
    }
    if(this.phase.name === 'mvp') {
      this.bugs += this.phase.bugs;
      this.phase = this.phases.polish;
    } else if(this.phase.name === 'polish') {
      this.bugs += this.phase.bugs;
      this.phase = this.phases.test;
    }
    this.company.product.trigger('change')
    return this.phase;
  },
  launchProduct: function() {
    this.productModule.releaseModule();
    this.trigger('change')
    this.company.product.trigger('change')
  }
};
