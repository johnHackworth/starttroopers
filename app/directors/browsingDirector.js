window.tr = window.tr || {};
window.tr.directors = window.tr.directors || {};


window.tr.directors.BrowsingDirector = function() {
  this.history = [];
  this._MAX_HISTORY = 20;
  this.current = -1;
  this.addNext = true;
}
window.tr.directors.BrowsingDirector.prototype = {
  add: function(tab, id) {
    if(this.addNext) {
      this.history.splice(this.current+1, this.history.length);
      this.removeCurrentInstances(tab, id);
      this.history.push({'tab': tab, id: id});
      this.trim();
      this.current = this.history.length - 1;
    }
    this.addNext = true;
  },
  removeCurrentInstances: function(tab, id) {
    var currentInstances = [];
    for(var n in this.history) {
      if(this.history[n].tab == tab &&
        this.history[n].id == id
      ) {
        currentInstances.push(n);
      }
    }
    currentInstances.reverse();
    console.log(currentInstances);
    for(var m in this.currentInstances) {
      this.history.splice(m, 1);
    }
  },
  dontAddNext: function() {
    this.addNext = false;
  },
  trim: function() {
    while(this.history.length > this._MAX_HISTORY) {
      this.history.shift();
    }
  },
  getCurrent: function() {
    return this.history[this.current]
  },
  prev: function() {
    this.current--;
    if(this.current <= 0) {
      this.current = 0;
    }
    return this.getCurrent();
  },
  next: function() {
    this.current++;
    if(this.current > this.history.length - 1) {
      this.current = this.history.length - 1;
    }
    return this.getCurrent();
  }
}
