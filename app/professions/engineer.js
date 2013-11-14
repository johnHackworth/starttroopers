window.tr = window.tr || {};
window.tr.decorators = window.tr.decorators || {};

window.tr.decorators.engineering = function(options) {
}

window.tr.decorators.engineering.prototype = {

  randomizeStudies: function() {
    if(this.mainInterest === 'engineering') {
      if(Math.random() * 100 < 50) {
        this.perks.push('engineering graduate');
        this.increaseStat('architecture', 20);
        this.increaseStat('backend', 15);
        this.increaseStat('frontend', 10);
        this.increaseStat('operations', 5);
        this.desiredWage += 10000;
      } else {
        this.selfTaught()
      }
    }
  },
  selfTaught: function() {
    this.perks.push('selfTaught');
    this.increaseStat('business', tr.randInt(10));
    this.increaseStat('architecture',  tr.randInt(40));
    this.increaseStat('backend',  tr.randInt(40));
    this.increaseStat('frontend',  tr.randInt(40));
    this.increaseStat('operations',  tr.randInt(40));
    this.increaseStat('visualDesign',  tr.randInt(5));
    this.increaseStat('productDesign',  tr.randInt(15));
    this.increaseStat('qa',  tr.randInt(15));
  },

  randomizeExperience: function() {
    this.experience = tr.randInt(10);
    var posiblePastJobs = ['enterpreur', 'business', 'front', 'back', 'designer']
    var increase = 0;
    for(var i = 0; i < this.experience; i++) {
      if(this.mainInterest === 'engineering') {
        var frontAlpha = tr.randInt(10 * this.learning / 100)
        this.increaseStat('frontend', frontAlpha);
        var backAlpha = tr.randInt(10 * this.learning / 100)
        this.increaseStat('backend', backAlpha);
        var archAlpha = tr.randInt(10 * this.learning / 100)
        this.increaseStat('architecture', archAlpha);
        var opAlpha = tr.randInt(10 * this.learning / 100)
        this.increaseStat('operations', opAlpha);
        var qaAlpha = tr.randInt(10 * this.learning / 100)
        this.increaseStat('qa', qaAlpha);
        increase = frontAlpha + qaAlpha + backAlpha + archAlpha + opAlpha
        this.desiredWage += increase * 200 * (this.negociation / 100);
      }
      this.randomizePerks();
    }
  },
  randomizePerks: function() {
    if(tr.randInt() < 5) {
      if(this.mainInterest === 'engineering') {
        var chooseInt = tr.randInt(4);
        if(chooseInt == 0) {
          this.perks.push('frontender');
          this.increaseStat('frontend', 30);
        }
        if(chooseInt == 1) {
          this.perks.push('back-man');
          this.increaseStat('backend', 30);
        }
        if(chooseInt == 2) {
          this.perks.push('devops');
          this.increaseStat('operations', 30);
        }
        if(chooseInt == 3) {
          this.perks.push('qa');
          this.increaseStat('qa', 30);
        }
      }
    }
  },
  getHapinessFromWork: function() {
    if(this.positions.indexOf('front') ||
      this.positions.indexOf('back') ||
      this.positions.indexOf('architecture') ||
      this.positions.indexOf('operations')
    ) {
      this.happiness -= 0.03 * (100 - this.workEthics) / 100
    }
    if(this.perks.indexOf('frontender') >= 0 &&
      this.positions.indexOf('front') >= 0
    ) {
      this.happiness += 0.01;
    }
    if(this.perks.indexOf('back-man') >= 0 &&
      this.positions.indexOf('back') >= 0
    ) {
      this.happiness += 0.01;
    }
    if(this.perks.indexOf('devops') >= 0 &&
      this.positions.indexOf('operations') >= 0
    ) {
      this.happiness += 0.01;
    }
  }
}
