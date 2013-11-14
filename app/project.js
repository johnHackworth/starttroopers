window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Project = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  this.initialize();
}

window.tr.models.Project.prototype = {
  bugs: 0,
  knowBugs: 0,
  projectPhases: ['mvp', 'polish', 'test'],
  initialize: function() {
    this.name = this.options.name;
    this.phases = []
    this.people = [];
    this.initPhases();
  },
  createPhase: function(name, goals) {
    if(!goals) {
      goals= [100,100,100,100,100,100]
    }
    var phase = {
      name: name,
      definition: 0,
      definitionGoal: goals[0],
      design: 0,
      designGoal: goals[1],
      back: 0,
      backGoal: goals[2],
      front: 0,
      frontGoal: goals[3],
      architecture: 0,
      architectureGoal: goals[4],
      operations: 0,
      operationsGoal: goals[5],
      bugs: 0
    }
    return phase;
  },
  initPhases: function() {
    this.phases = {
      mvp: this.createPhase('mvp'),
      polish: this.createPhase('polish'),
      test: this.createPhase('test')
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
    for(var i = 0; i < 12; i++) {
      for(var n in this.people) {
        if(this.people[n].hours[i] &&
            this.people[n].hours[i] === this.name
          ) {
          this.addWork(this.people[n]);
          console.log((i + 8) +':00 hours, ' + this.people[n].name + ' working on ' + this.name)
        }
      }
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
    this.log(stat + ' of ' + this.name + ' completed');
    var completed = true;
    if(this.phase.definition < this.phase.definitionGoal) completed = false;
    if(this.phase.design < this.phase.designGoal) completed = false;
    if(this.phase.back < this.phase.backGoal) completed = false;
    if(this.phase.front < this.phase.frontGoal) completed = false;
    if(this.phase.architecture < this.phase.architectureGoal) completed = false;
    if(this.phase.operations < this.phase.  operationsGoal) completed = false;
    if(completed) this.phaseCompleted();
  },
  phaseCompleted: function() {
    this.phase.completed = true;
    this.trigger('completedPhase');
    this.log(this.name + ' completed');
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
    return this.phase;
  },
  completeProduct: function() {

  }
}
