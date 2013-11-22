window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.Inversor = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  tr.utils.extend.call(this, tr.utils.Stats);
  this.initialize();
}

window.tr.models.Inversor.prototype = {
  cash: 1000000,
  currentTurn: 0,
  knowledgeAboutTheCompany: 0,
  companyPerception: 0,
  hypeAboutTheCompany: 0,
  negociation: 0,
  hypeable: 0,
  initialize: function() {
    this.name = this.options.name;
    this.people = [];
    this.negociation = 50 + tr.randInt(50);
    this.hypeable = tr.randInt(100);
  },
  turn: function() {
    this.currentTurn++;
    this.increaseStat('hypeAboutTheCompany', -0.1);
    this.increaseStat('knowledgeAboutTheCompany', -0.025);
  },
  getADemo: function(person) {
    var demoValue = (person.maketing + person.sociability) / 2;
    var howItWhen = tr.randInt(101);
    if(demoValue > howItWhen) {
      if(demoValue / 2 > howItWhen) {
        this.log(this.name + ' are very impressed by a demo of '+person.company.name);
        person.log(this.name + ' has made a impressive demo on ' + this.name);
        this.increaseStat('knowledgeAboutTheCompany', 3 + tr.randInt(3));
        this.increaseStat('companyPerception', 1 + tr.randInt(3));
        this.increaseStat('hypeAboutTheCompany', 10 + tr.randInt(10));
      } else if(demoValue > howItWhen) {
        this.log(this.name + ' made an interesting pressentation about '+person.company.name);
        person.log(this.name + ' has made a nice demo on ' + this.name);
        this.increaseStat('knowledgeAboutTheCompany', 2 + tr.randInt(2));
        this.increaseStat('hypeAboutTheCompany', tr.randInt(10));
        this.increaseStat('companyPerception', 1);
      } else {
        this.log(this.name + ' made an rather dissapointing pressentation about '+person.company.name);
        person.log(this.name + ' has made a awful demo on ' + this.name);
        this.increaseStat('knowledgeAboutTheCompany', tr.randInt(2));
        this.increaseStat('hypeAboutTheCompany', -1 * tr.randInt(5));
        this.increaseStat('companyPerception', -1);
      }
    }
  },
  isInterested: function() {
    var hypeValue = this.hypeable + this.hypeAboutTheCompany - 100;
    if(hypeValue < 0) hypeValue = 0;

  }
}
