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
  currentTurn: 0,
  culture: 'generic',
  ageGroup: '',
  size: 100000,
  knowTheProduct: 0,
  useTheProduct: 0,
  hype: 0,
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
  turn: function(currentTurn) {
    this.currentTurn = currentTurn;
    this.knowTheProduct -=  Math.floor(this.knowTheProduct / 1000);;
    this.useTheProduct -= Math.floor(this.useTheProduct / 100);
    this.likeTheProduct -= Math.floor(this.likeTheProduct / 50);;
    this.trimStats();
  },
  trimStats: function() {
    if(this.knowTheProduct < 0) this.knowTheProduct = 0;
    if(this.knowTheProduct > this.size) this.knowTheProduct = this.size;
    if(this.useTheProduct < 0) this.useTheProduct = 0;
    if(this.useTheProduct > this.knowTheProduct) this.useTheProduct = this.knowTheProduct;
    if(this.likeTheProduct < 0) this.likeTheProduct = 0;
    if(this.likeTheProduct > this.useTheProduct) this.likeTheProduct = this.useTheProduct;
  },
  newProductUsers: function() {
    var noAccountUsers = this.knowTheProduct - this.useTheProduct;
    var userPercentaje = 10 + tr.randInt(this.hype);
    console.log(noAccountUsers, userPercentaje);
    var newUsers = Math.floor(noAccountUsers * userPercentaje / 100);
    this.trigger('newUsers', newUsers, this);
    this.useTheProduct += newUsers;
  },
  getVisits: function() {
    var happyUsers = this.likeTheProduct;
    var unconvinced = this.useTheProduct - happyUsers;
    var visits = 0;
    if(happyUsers) {
      visits += Math.floor(3*happyUsers / 4) + tr.randInt(Math.floor(1*happyUsers / 4));
    }
    if(unconvinced) {
      visits += tr.randInt(unconvinced);
    }
    return visits;
  }

}
