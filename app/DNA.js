window.tr = window.tr || {};
window.tr.models = window.tr.models || {};

window.tr.models.DNA = function(options) {
  this.options = options;
  this.culture = options.culture;
  this.initialize();
}

window.tr.models.DNA.prototype = {
  maxs: [
    2,6,4,8,15,9,7,9,7,12,2,7,1
  ],
  hairColors: 4,
  map: {
    sex: 0,
    background: 1,
    haircolor:2,
    face:3,
    eyes:4,
    nose:5,
    mouth:6,
    hair:7,
    clothes: 8,
    facialfeatures: 9,
    beard: 10,
    glasses: 11,
  },
  dismorfic: [
    "face", "hair", "clothes"
  ],
  cultureRestriction: {
    "arabic": {
      "3": [4, 5, 7],
      "2": [3]
    },
    "eastAsian": {
      "3": [3, 4, 5],
      "2": [2,3],
      "4": [0,1,2,5,12,13],
      "9": [8,9,10,11],
      "7": [2]
    },
    "spanish": {
      "3": [4, 5, 7],
      "2": [2],
      "4": [0,5,7,8,9,10,11,12,13]
    },
    "anglosaxon": {
      "4": [7,8,9,10,11,12,14]
    }
  },
  initialize: function() {
    this.chromosomes = [
      0, // sex
      0, // background
      0, // face
      0, // eyes
      0, // nose
      0, // mouth
      0, // hair
      0, // clothes
      0, // facialfeatures
      0, // hasbear
      0, // glasses
      0 // ?
    ];
    this.randomize();
  },
  randomize: function() {
    for(var i = 0; i < 12; i++) {
      var isValid = false;
      while(!isValid) {
        if(i == 9) { // facialfeatures
          if(tr.randInt() > 25) {
            this.chromosomes[i] = tr.randInt(this.maxs[i])
          }
        } else if(i == 10) { // beard
          if(this.chromosomes[0] === 0 &&
            tr.randInt() > 50) {
            this.chromosomes[i] = tr.randInt(this.maxs[i])
          } else {
            this.chromosomes[i] = 0;
          }
        } else if(i == 11) { // hasGlasses
          if(tr.randInt() > 50) {
            this.chromosomes[i] = tr.randInt(this.maxs[i])
          }
        } else{
         this.chromosomes[i] = tr.randInt(this.maxs[i])
        }
        isValid = this.checkCulture(i);
      }
    }
  },
  get: function(attr) {
    if(attr == 'hair') {
      return this.chromosomes[0]+ '/'+
        this.chromosomes[this.map['hair']] + '_' +
        this.chromosomes[this.map['haircolor']]
    } else if(attr == 'beard') {
      if(this.chromosomes[0] === 0 &&
        this.chromosomes[this.map['beard']] > 0) {
        return this.chromosomes[this.map['face']] + '_' +
          this.chromosomes[this.map['haircolor']]
      } else {
        return 0;
      }
    } else {
      if(this.dismorfic.indexOf(attr) >= 0) {
        return this.chromosomes[0]+ '/'+this.chromosomes[this.map[attr]];
      } else {
        return this.chromosomes[this.map[attr]];
      }


    }
  },
  checkCulture: function(attr) {
    var cult = this.culture;
    if(cult in this.cultureRestriction) {
      if(attr in this.cultureRestriction[cult]) {
        if(this.cultureRestriction[cult][attr].indexOf(this.chromosomes[attr]) >= 0) {
          return false;
        }
      }

    }
    return true;
  }
}
