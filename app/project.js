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
    var phase = this.createPhase('First Prototype')
  },
  turn: function() {
  },
}
