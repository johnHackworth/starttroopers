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
        this.newPerk('designSchool');
        this.desiredWage += 5000;
      } else {
        this.selfTaught()
      }
    }
  },
  selfTaught: function() {
    this.newPerk('selfTaughtDesign');
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
        if(chooseInt == 0 && this.newPerk('UX')) {
        }
        if(chooseInt == 1 && this.newPerk('colorTheory')) {
        }
        if(chooseInt == 2 && this.newPerk('seniority')) {
        }
        if(chooseInt == 3 && this.newPerk('dribbbler')) {
        }
        if(chooseInt == 4 && this.newPerk('developingSkills')) {
        }
        if(chooseInt == 5 && this.newPerk('appDesigner')) {
        }
        if(chooseInt == 6 && this.newPerk('industrialDesigner')) {
        }
      }
    }
    if(tr.randInt() < 5) {
      this.newPerk('scenesterDesign');
    }
    if(tr.randInt(1000) < 15) {
      this.newPerk('rockstarDesign');
      if(tr.randInt() < 10) {
        this.newPerk('guruDesign');
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
