window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.NPCCompany = function(options) {
  this.options = options;
  tr.utils.extend.call(this, tr.utils.Eventable);
  tr.utils.extend.call(this, tr.utils.Loggable);
  tr.utils.extend.call(this, tr.utils.Stats);

  this.initialize();
}

window.tr.models.NPCCompany.prototype = {
  human:false,
  cash: 100000,
  currentTurn: 0,
  companyValue: 1000000,
  companyOwnShare: 100,
  hype: 0,
  initialize: function() {
    this.id = tr.randInt(1000000);
    this.name = this.options.name || 'the company';
    this.type = this.options.type;
    this.hype = this.options.hype;
    this.size = this.options.size;
    this.wages = this.options.wages;
    this.level = this.options.level;
    this.people = [];
    this.beingScouted = [];
    this.world = tr.app.director.world;
  },

  turn: function() {
    this.currentTurn++;
    this.socialize();
    this.actualizeHype();
    this.checkPersonal();
    this.trigger('newTurn')
  },
  socialize: function() {
    var hourly = [];
    for(var i = 0; i < 12; i++) {
      hourly = [];
      for(var n in this.people) {
        if(this.people[n].hours[i] &&
            this.people[n].hours[i] === 'social'
          ) {
          hourly.push(this.people[n]);
        }
      }
      for(var m in hourly) {
        hourly[m].socialize(hourly);
      }
    }
  },

  addPerson: function(person) {
    if(this.people.indexOf(person) < 0) {
      this.people.push(person);
      person.company = this;
      this.log('The company has signed '+person.name)
      if(person.followers > 500) {
        this.log(person.name + ' is a star on the business')
        this.addHype(person.followers / 500);
      }
      var pos = this.beingScouted.indexOf(person);
      if(pos >= 0) {
        this.beingScouted.splice(pos, 1);
      }
      person.beingScouted = false;
      this.trigger('newHire', person)
    } else {
      this.log('The company signed a new contract with'+person.name)
    }
  },
  addPerson: function(person) {
    if(this.people.indexOf(person) < 0) {
      if(person.company) {
        person.company.hiredByOther(person, this);
      }
      this.people.push(person);
      person.company = this;
      this.log('The company has signed '+person.name)
      if(person.followers > 500) {
        this.log(person.name + ' is a star on the business')
        this.addHype(person.followers / 500);
      }
    } else {
      this.log('The company signed a new contract with'+person.name)
    }
  },
  addHype:function(quality) {
    this.increaseStat('hype', quality);
  },
  actualizeHype: function() {
    var hypeVariation = -1 * this.hype * 0.01;
    this.increaseStat('hype', hypeVariation);
  },
  transferOwnShare: function(share, person) {
    if(!share) {
      return true;
    }
    if(this.companyOwnShare - share >= 0) {
      person.companyShare += share;
      this.companyOwnShare -= share;
      this.log(share +'% of the company now belongs to '+person.name);
      return true;
    }
    return false;
  },
  checkPersonal: function() {
    var nPeople = {
      'business': 0,
      'design': 0,
      'engineering': 0
    }
    for(var n in this.people) {
      nPeople[this.people[n].mainInterest]++;
    }
    if(this.size[0] > nPeople.business) {
      this.recruit('business');
    }
    if(this.size[1] > nPeople.design) {
      this.recruit('design');
    }
    if(this.size[2] > nPeople.engineering) {
      this.recruit('engineering');
    }
  },
  recruit: function(prof) {
    var requiredExperience = {
      "business": this.level[0],
      "design": this.level[1],
      "engineering": this.level[2]
    }
    var maxWage = {
      "business": this.wages[0],
      "design": this.wages[1],
      "engineering": this.wages[2]
    }
    var randomPerson = tr.randInt(this.world.TOTAL_PEOPLE);
    var person = this.world.people[randomPerson];
    if(person.mainInterest === prof) {
      if(person.experience >= requiredExperience[prof]) {
        var wage = maxWage[prof] * 1000
        var randOffer = Math.floor(wage * (1 + (tr.randInt(60) - 30) / 100));
        person.getOffer(randOffer, 0, this);
        this.log(this.name +' made an offer of ' +randOffer+ 'to '+person.name)
      }
    }
  },
  addNotification: function() {

  },
  hiredByOther: function(person, otherCompany) {
    this.removePerson(person);
    this.log(person.name + ' has left the company');
  },
  removePerson: function(person) {
    if(this.people.indexOf(person) >= 0) {
      this.people.splice(this.people.indexOf(person), 1);
    }
  },
  export: function() {
    var json = {}
    for(var n in this) {
      if(this[n].export) {

        json[n] = this[n].export();
      } else if(typeof this[n] !== 'object' && typeof this[n] !== 'function') {
        json[n] = this[n]
      }
    }

    var arrays = ['wages', 'level', 'size']
    for(var m in arrays) {
      var propName = arrays[m];
      json[propName] = [];
      for(var o in this[propName]) {
        json[propName].push(this[propName][o]);
      }
    }
    json.people = [];
    for(var n in this.people) {
      json.people.push(this.people[n].id)
    }

    return json;
  },
  import: function(json) {

    for(var n in json) {
      if(typeof json[n] !== 'object') {
        this[n] = json[n];
      }
    }
    var arrays = ['wages', 'level', 'size']
    for(var m in arrays) {
      var propName = arrays[m];
      this[propName] = [];
      for(var o in this[propName]) {
        this[propName].push(json[propName][o]);
      }
    }

  }
};
