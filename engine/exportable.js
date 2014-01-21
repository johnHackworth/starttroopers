window.tr = window.tr || {};
window.tr.utils = window.tr.utils || {};

window.tr.utils.Exportable = function() {
  this.exportToObject = function(secondLevel) {
    var json = {};
    for(var n in this) {
      if(this[n] && this[n].id) {
        json[n] = this[n].id;
      }
      if(this[n] &&this[n].export && !secondLevel) {
        json[n] = this[n].export(true);
      } else if(this[n] && typeof this[n] !== 'object' && typeof this[n] !== 'function') {
        json[n] = this[n];
      }
    }
    return json;
  };
  this.exportArray = function(name) {
    var json = [];
    for(var i in this[name]) {
      if(this[name][i].id) {
        json.push(this[name][i].id);
      } else if(this[name][i].name) {
        json.push(this[name][i].name);
      } else {
        if(this[name][i].export) {
          json.push(this[name][i].export(true));
        } else if(typeof this[name][i] !== 'object' && typeof this[name][i] !== 'function') {
          json.push(this[name][i]);
        }
      }
    }
    return json;
  };
};


