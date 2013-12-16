window.tr = window.tr || {};
window.tr.decorators = window.tr.decorators || {};

window.tr.decorators.business = function(options) {
}

window.tr.decorators.business.prototype = {

  randomizeStudies: function() {
    this.resetStats();
    if(this.mainInterest === 'business') {
      if(Math.random() * 100 < 33) {
        this.perks.push('MBA');
        this.increaseStat('business', 30);
        this.increaseStat('marketing', 10);
        this.desiredWage += 20000;
      } else if(Math.random() * 100 < 33) {
        this.perks.push('Marketing');
        this.increaseStat('marketing', 30);
        this.increaseStat('business', 10);
        this.desiredWage += 15000;
      } else {
        this.selfTaught()
      }
    }
  },
  selfTaught: function() {
    this.perks.push('selfTaught');
    this.increaseStat('business', tr.randInt(30));
    this.increaseStat('marketing', tr.randInt(30));
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
        if(tr.randInt() < 33) {
          increase = tr.randInt(10 * this.learning / 100);
          this.increaseStat('business', increase);
          this.desiredWage += increase * 1000 * (this.negotiation / 100);
        } else if(tr.randInt() < 33) {
          increase = tr.randInt(10 * this.learning / 100);
          this.increaseStat('marketing', increase);
          this.desiredWage += increase * 1000 * (this.negotiation / 100);
        } else if(tr.randInt() < 15 ) {
          increase = tr.randInt(10 * this.learning / 100);
          this.increaseStat('marketing', increase);
          increase = tr.randInt(10 * this.learning / 100);
          this.increaseStat('business', increase);
          increase = tr.randInt(10 * this.learning / 100);
          this.increaseStat('productDesign', increase);
          this.desiredWage += increase * 1000 * (this.negotiation / 100);
        } else {
          increase = tr.randInt(6 * this.learning / 100)
          this.increaseStat('business', increase)
          this.increaseStat('marketing', increase)
          this.increaseStat('productDesign', tr.randInt(5 * this.learning / 100))
          this.desiredWage += increase * 1000 * (this.negotiation / 100);
        }
        this.followers += tr.randInt(followersRatio * increase *  increase * tr.randInt(10));
      }
      this.randomizePerks();
    }
  },
  randomizePerks: function() {
    if(tr.randInt() < 5 ) {
      if(this.mainInterest === 'business') {
        var chooseInt = tr.randInt(8);
        if(chooseInt == 0 && this.addPerk('negotiator')) {
          this.increaseStat('negotiation', 20);
        }
        if(chooseInt == 1 && this.addPerk('leader')) {
          this.increaseStat('sociability', 30);
        }
        if(chooseInt == 2 && this.addPerk('enterpreneur')) {
          this.increaseStat('sociability', 5);
          this.increaseStat('marketing', 10);
          this.increaseStat('business', 5);
        }
        if(chooseInt == 3 && this.addPerk('publicist')) {
          this.increaseStat('marketing', 40);
          this.increaseStat('productDesign', 15);
        }
        if(chooseInt == 4 && this.addPerk('account executive')){
          this.increaseStat('sociability', 25);
          this.increaseStat('marketing', 5);
        }
        if(chooseInt == 5 && this.addPerk('creative')) {
          this.increaseStat('marketing', 25);
          this.increaseStat('visualDesign', 15);
        }
        if(chooseInt == 6 && this.addPerk('social media')) {
          this.increaseStat('marketing', 15);
          this.increaseStat('sociability', 15);
          this.followers += 300;
        }
        if(chooseInt == 7 && this.addPerk('head hunter')) {
          this.increaseStat('scouting', 40);
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
