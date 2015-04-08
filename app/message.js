window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Message = function(options) {
  this.initialize(options);
};

window.tr.models.Message.prototype = {
  initialize: function(options) {
    for(var n in options) {
      this[n] = options[n];
    }
    if(this.type === 'person') {
      this.person = this.world.getPersonById(this.id);
    }

  },
  getSubject: function() {
    var defaultSubject = this.type + ' notification';

    return this.subject || defaultSubject;
  },
  getFrom: function() {
    if(this.type === 'person') {
      return this.person.name;
    }
    return 'Notification Center';

  }

};
