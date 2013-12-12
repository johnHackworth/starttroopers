window.tr = window.tr || {};
window.tr.decorators = window.tr.decorators || {};

window.tr.decorators.engineering = function(options) {
}

window.tr.decorators.engineering.prototype = {

  randomizeStudies: function() {
    this.resetStats();
    if(this.mainInterest === 'engineering') {
      if(Math.random() * 100 < 50) {
        this.followers += tr.randInt(200);
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
    var followersRatio = this.sociability / 100;
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
        this.desiredWage += increase * 200 * (this.negotiation / 100);
      }
      this.followers += tr.randInt(followersRatio * increase * increase * tr.randInt(10));
      this.randomizePerks();
    }
  },
  randomizePerks: function() {
    if(tr.randInt() < 5) {
      if(this.mainInterest === 'engineering') {
        var chooseInt = tr.randInt(11);
        if(chooseInt == 0 && this.addPerk('frontender')) {
          this.increaseStat('frontend', 30);
        }
        if(chooseInt == 1 && this.addPerk('backman')) {
          this.increaseStat('backend', 30);
        }
        if(chooseInt == 2 && this.addPerk('devops')) {
          this.increaseStat('operations', 30);
        }
        if(chooseInt == 3 && this.addPerk('qa')) {
          this.increaseStat('qa', 30);
        }
        if(chooseInt == 4 && this.addPerk('craftsman')) {
          this.increaseStat('hypeable', 10);
          this.increaseStat('workEthics', 10);
          this.bugModificator -= 0.20;
          this.detailModificator -= 0.10;
        }
        if(chooseInt == 5 && this.addPerk('cleancoder')) {
          this.increaseStat('hypeable', 15);
          this.increaseStat('learning', 10);
          this.bugModificator -= 0.20;
          this.detailModificator -= 0.20;
        }
        if(chooseInt == 6 && this.addPerk('cowboy coder')) {
          this.increaseStat('hypeable', -5);
          this.increaseStat('learning', 10);
          this.bugModificator += 0.20;
          this.detailModificator += 0.20;
        }
        if(chooseInt == 7 && this.addPerk('debugger')) {
          this.debugger = true;
        }
        if(chooseInt == 8 && this.addPerk('design eye')) {
          this.increaseStat('visualDesign', 25);
          this.increaseStat('frontend',10);
        }
        if(chooseInt == 9 && this.addPerk('brogrammer')) {
          this.increaseStat('sociability', 20);
        }
        if(chooseInt == 10 && this.addPerk('data scientist')) {
          this.increaseStat('architecture', 30);
        }
      }
    }
    if(tr.randInt() < 5 && this.addPerk('scenester')) {
      this.followers += 300;
    }
    if(tr.randInt(1000) < 15 && this.addPerk('rock star')) {
      this.followers += 1000;
      if(tr.randInt() < 10 && this.addPerk('guru')) {
        this.followrs += 4000;
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
