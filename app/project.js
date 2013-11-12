window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Project = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  this.initialize();
}

window.tr.models.Project.prototype = {
  initialize: function() {
    this.name = this.options.name;
    this.phases = []
    this.people = [];
    this.initPhases();
  },
  createPhase: function(name) {
    var phase = {
      name: name,
      definition: 0,
      definitionGoal: 100,
      design: 0,
      designGoal: 100,
      back: 0,
      backGoal: 100,
      front: 0,
      frontGoal: 100,
      architecture: 0,
      architectureGoal: 100
    }
    return phase;
  },
  initPhases: function() {
    this.phase = this.createPhase('First Prototype')
  },
  turn: function() {
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
      this.phase[n] += hourWork[n]
    }
  }
}
