window.tr = window.tr || {};
window.tr.utils = window.tr.utils || {};

window.tr.utils.extend = function(object) {
  object.call(this);
  for(var n in object.prototype) {
    this[n] = object.prototype[n]
  }
};

