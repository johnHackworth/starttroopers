window.tr = window.tr || {};
window.tr.decorators = window.tr.decorators || {};

window.tr.decorators.business = function(options) {
}

window.tr.decorators.business.prototype = {

  randomizeStudies: function() {
    this.resetStats();
    if(this.mainInterest === 'business') {
      if(Math.random() * 100 < 50) {
        this.perks.push('MBA');
        this.increaseStat('business', 30);
        this.desiredWage += 20000;
      } else {
        this.selfTaught()
      }
    }
  },
  selfTaught: function() {
    this.perks.push('selfTaught');
    this.increaseStat('business', tr.randInt(50));
    this.increaseStat('architecture',  tr.randInt(5));
    this.increaseStat('backend',  tr.randInt(5));
    this.increaseStat('frontend',  tr.randInt(10));
    this.increaseStat('operations',  tr.randInt(10));
    this.increaseStat('visualDesign',  tr.randInt(20));
    this.increaseStat('productDesign',  tr.randInt(30));
    this.increaseStat('qa',  tr.randInt(30));
  },

  randomizeExperience: function() {
    this.experience = tr.randInt(10);
    var posiblePastJobs = ['enterpreur', 'business', 'front', 'back', 'designer']
    var increase = 0;
    var followersRatio = this.sociability / 100;
    for(var i = 0; i < this.experience; i++) {
      if(this.mainInterest === 'business') {
        if(tr.randInt() > 50) {
          increase = tr.randInt(10 * this.learning / 100);
          this.increaseStat('business', increase)
          this.desiredWage += increase * 1000 * (this.negotiation / 100);
        } else {
          increase = tr.randInt(8 * this.learning / 100)
          this.increaseStat('business', increase)
          this.increaseStat('productDesign', tr.randInt(5 * this.learning / 100))
          this.desiredWage += increase * 1000 * (this.negotiation / 100);
        }
        this.followers += tr.randInt(followersRatio * increase *  increase * tr.randInt(10));
      }
      this.randomizePerks();
    }
  },
  randomizePerks: function() {
    if(tr.randInt() < 5) {
      if(this.mainInterest === 'business') {
        var chooseInt = tr.randInt(2);
        if(chooseInt == 0) {
          this.perks.push('negotiator');
          this.increaseStat('negotiation', 20);
        }
        if(chooseInt == 1) {
          this.perks.push('leader');
          this.increaseStat('sociability', 10);
        }
      }
    }
    if(tr.randInt(1000) < 15) {
      this.perks.push('media savvy');
      this.followers += 2000;
      if(tr.randInt() < 10) {
        this.perks.push('guru');
        this.followrs += 5000;
      }
    }
  }

}
