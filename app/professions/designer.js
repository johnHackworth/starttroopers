window.tr = window.tr || {};
window.tr.decorators = window.tr.decorators || {};

window.tr.decorators.design = function(options) {
}

window.tr.decorators.design.prototype = {

  randomizeStudies: function() {
    this.resetStats();
    if(this.mainInterest === 'design') {
      if(Math.random() * 100 < 50) {
        this.followers += tr.randInt(200);
        this.addPerk('design school');
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
    this.addPerk('selfTaught');
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
    var followersRatio = this.sociability / 100;
    for(var i = 0; i < this.experience; i++) {
      if(this.mainInterest === 'design') {
        increase = tr.randInt(10 * this.learning / 100)
        this.increaseStat('productDesign',increase)
        this.increaseStat('visualDesign', tr.randInt(10 * this.learning / 100))
        this.desiredWage += increase * 600 * (this.negotiation / 100);
      }
      this.followers += tr.randInt(followersRatio * increase * increase * tr.randInt(10));

      this.randomizePerks();
    }
  },
  randomizePerks: function() {
    if(tr.randInt() < 5) {
      if(this.mainInterest === 'design') {
        var chooseInt = tr.randInt(7);
        if(chooseInt == 0 && this.addPerk('UX')) {
          this.increaseStat('productDesign', 30);
        }
        if(chooseInt == 1 && this.addPerk('color theory')) {
          this.increaseStat('visualDesign', 10);
        }
        if(chooseInt == 2 && this.addPerk('seniority')) {
          this.increaseStat('visualDesign', 10);
          this.increaseStat('productDesign', 10);
        }
        if(chooseInt == 3 && this.addPerk('dribbbler')) {
          this.increaseStat('visualDesign', 10);
          this.increaseStat('productDesign', -10);
          this.followrs  += tr.randInt(1000);
        }
        if(chooseInt == 4 && this.addPerk('develop. skills')) {
          this.increaseStat('frontend', 30);
          this.increaseStat('backend', 20);
        }
        if(chooseInt == 5 && this.addPerk('app designer')) {
          this.appDesign = true;
        }
        if(chooseInt == 6 && this.addPerk('industrial designer')) {
          this.increaseStat('productDesign', 20);
        }
      }
    }
    if(tr.randInt() < 5) {
      this.addPerk('scenester');
      this.followers += 600;
    }
    if(tr.randInt(1000) < 15) {
      this.addPerk('rock star');
      this.followers += 3000;
      if(tr.randInt() < 10) {
        this.addPerk('guru');
        this.followers += 9000;
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
