window.tr = window.tr || {};
window.tr.decorators = window.tr.decorators || {};

window.tr.decorators.business = function(options) {
}

window.tr.decorators.business.prototype = {

  randomizeStudies: function() {
    this.resetStats();
    if(this.mainInterest === 'business') {
      if(Math.random() * 100 < 33) {
        this.newPerk('mba');
        this.desiredWage += 20000;
      } else if(Math.random() * 100 < 33) {
        this.newPerk('marketing');
        this.desiredWage += 15000;
      } else {
        this.selfTaught()
      }
    }
  },
  selfTaught: function() {
    this.newPerk('businessSelfTaught');
  },

  randomizeExperience: function() {
    this.experience = tr.randInt(10);
    var posiblePastJobs = ['enterpreur', 'business', 'front', 'back', 'designer']
    var increase = 0;
    var followersRatio = this.sociability / 100;
    for(var i = 0; i < this.experience; i++) {
      if(tr.randInt() < 33) {
        increase = tr.randInt(20 * this.learning / 100);
        this.increaseStat('business', increase);
        this.desiredWage += increase * 1000 * (this.negotiation / 100);
      } else if(tr.randInt() < 33) {
        increase = tr.randInt(20 * this.learning / 100);
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
      this.randomizePerks();
    }
  },
  randomizePerks: function() {
    if(tr.randInt() < 5 ) {
      if(this.mainInterest === 'business') {
        var chooseInt = tr.randInt(8);
        if(chooseInt == 0 && this.newPerk('negotiator')) {
        }
        if(chooseInt == 1 && this.newPerk('leader')) {
        }
        if(chooseInt == 2 && this.newPerk('enterpreneur')) {
        }
        if(chooseInt == 3 && this.newPerk('publicist')) {
        }
        if(chooseInt == 4 && this.newPerk('accountExecutive')){
        }
        if(chooseInt == 5 && this.newPerk('creative')) {
        }
        if(chooseInt == 6 && this.newPerk('socialMedia')) {
        }
        if(chooseInt == 7 && this.newPerk('headHunter')) {
        }
      }
    }
    if(tr.randInt(1000) < 15) {
      this.newPerk('mediaSavvy');
      if(tr.randInt() < 10) {
        this.newPerk('guruBusiness');
      }
    }
  }

}
