window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Company = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  this.initialize();
}

window.tr.models.Company.prototype = {
  cash: 1000,
  initialize: function() {
    this.name = this.options.name;
    this.project = null;
    this.people = [];
  },

  turn: function() {
    for(var n in this.people ) {
      this.people[n].turn();
    }
    this.socialize();
    this.project.turn();
  },

  socialize: function() {
    var hourly = [];
    for(var i = 0; i < 12; i++) {
      hourly = [];
      for(var n in this.people) {
        if(this.people[n].hours[i] &&
            this.people[n].hours[i] === 'social'
          ) {
          hourly.push(this.people[n].name);
        }
      }
      console.log(hourly.join(', '))
    }
  },

  initProject: function(options) {
    this.project = new tr.models.Project(options);
    this.project.company = this;
  },

  addPerson: function(person) {
    this.people.push(person);
  }

}
