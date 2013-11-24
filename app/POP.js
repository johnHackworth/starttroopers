window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.ageGroups = [
  16,
  25,
  45,
  60
]

window.tr.models.POP = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  this.initialize();
}

window.tr.models.POP.prototype = {
  culture: 'generic',
  ageGroup: '',
  size: 100000,
  knowTheProduct: 0,
  useTheProduct: 0,
  likeTheProduct: 0,
  initialize: function() {
    this.hobbies = [];
    this.ageGroup = this.options.ageGroup;
    this.randomizeHobbies();
    this.size = tr.randInt(500000);
  },
  randomizeSize: function(n) {
    this.size = tr.randInt(n)
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
}
