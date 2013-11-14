window.tr = window.tr || {};
window.tr.decorators = window.tr.decorators || {};

window.tr.decorators.design = function(options) {
}

window.tr.decorators.design.prototype = {

  randomizeStudies: function() {
    if(this.mainInterest === 'design') {
      if(Math.random() * 100 < 50) {
        this.perks.push('design school graduate');
        this.increaseStat('visualDesign', 25);
        this.increaseStat('frontend', 5);
        this.increaseStat('productDesign', 15);
        this.desiredWage += 5000;
      } else {
        this.selfTaught()
      }
    }
  },
  selfTaught: function() {
    this.perks.push('selfTaught');
    this.increaseStat('business', tr.randInt(20));
    this.increaseStat('architecture',  tr.randInt(10));
    this.increaseStat('backend',  tr.randInt(10));
    this.increaseStat('frontend',  tr.randInt(30));
    this.increaseStat('operations',  tr.randInt(10));
    this.increaseStat('visualDesign',  tr.randInt(40));
    this.increaseStat('productDesign',  tr.randInt(40));
    this.increaseStat('qa',  tr.randInt(20));
  },

  randomizeExperience: function() {
    this.experience = tr.randInt(10);
    var posiblePastJobs = ['enterpreur', 'business', 'front', 'back', 'designer']
    var increase = 0;
    for(var i = 0; i < this.experience; i++) {
      if(this.mainInterest === 'design') {
        increase = tr.randInt(10 * this.learning / 100)
        this.increaseStat('productDesign',increase)
        this.increaseStat('visualDesign', tr.randInt(10 * this.learning / 100))
        this.desiredWage += increase * 600 * (this.negociation / 100);
      }
      this.randomizePerks();
    }
  },
  randomizePerks: function() {
    if(tr.randInt() < 5) {
      if(this.mainInterest === 'design') {
        var chooseInt = tr.randInt(3);
        if(chooseInt == 0) {
          this.perks.push('UX');
          this.increaseStat('productDesign', 30);
        }
        if(chooseInt == 1) {
          this.perks.push('color theory');
          this.increaseStat('visualDesign', 10);
        }
        if(chooseInt == 1) {
          this.perks.push('seniority');
          this.increaseStat('visualDesign', 10);
          this.increaseStat('productDesign', 10);
        }
      }
    }
  },
  getHapinessFromWork: function() {
    if(this.positions.indexOf('visualDesign') ||
      this.positions.indexOf('productDesign')
    ) {
      this.happiness -= 0.03 * (100 - this.workEthics) / 100
    }
  }
}
