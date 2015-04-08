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
        this.newPerk('engineer');
        this.desiredWage += 10000;
      } else {
        this.selfTaught()
      }
    }
  },
  selfTaught: function() {
    this.newPerk('selfTaught');
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
        var chooseInt = tr.randInt(11 + 1);
        if(chooseInt == 0 && this.newPerk('frontender')) {
        }
        if(chooseInt == 1 && this.newPerk('backender')) {
        }
        if(chooseInt == 2 && this.newPerk('devops')) {
        }
        if(chooseInt == 3 && this.newPerk('qa')) {
        }
        if(chooseInt == 4 && this.newPerk('craftsman')) {
        }
        if(chooseInt == 5 && this.newPerk('cleancoder')) {
        }
        if(chooseInt == 6 && this.newPerk('cowboyCoder')) {
        }
        if(chooseInt == 7 && this.newPerk('debugger')) {
        }
        if(chooseInt == 8 && this.newPerk('designEye')) {
        }
        if(chooseInt == 9 && this.newPerk('brogrammer')) {
        }
        if(chooseInt == 10 && this.newPerk('dataScientist')) {
        }
        if(chooseInt == 11 && this.newPerk('appDeveloper')) {
        }
      }
    }
    if(tr.randInt() < 5 && this.newPerk('scenester')) {
    }
    if(tr.randInt(1000) < 15 && this.newPerk('rockstar')) {
      if(tr.randInt() < 10 && this.newPerk('guru')) {
      }
    }
  },
  getHapinessFromWork: function() {
    if(this.positions.indexOf('front') < 0 ||
      this.positions.indexOf('back')  < 0 ||
      this.positions.indexOf('architecture')  < 0 ||
      this.positions.indexOf('operations')  < 0
    ) {
      this.happiness -= 0.09 * (100 - this.workEthics) / 100
    } else if(this.hasPerk('frontender') &&
      this.positions.indexOf('front') >= 0
    ) {
      this.increaseStat('happiness', 0.01);
    } else if(this.hasPerk('back-man') &&
      this.positions.indexOf('back') >= 0
    ) {
      this.increaseStat('happiness', 0.01);
    } else if(this.hasPerk('devops') >= 0 &&
      this.positions.indexOf('operations') >= 0
    ) {
      this.increaseStat('happiness', 0.01);
    } else {
      this.happiness -= 0.01 * (100 - this.workEthics) / 100

    }
  }
}
