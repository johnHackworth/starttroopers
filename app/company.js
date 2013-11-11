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
    this.proyect = null;
    this.people = [];
  },

  turn: function() {
  },

  initProject: function(options) {
    this.project = new tr.models.Project(options);
    this.project.company = this;
  }

}
