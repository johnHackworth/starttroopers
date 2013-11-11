window.tr = window.tr || {};
window.tr.randInt = function(base) {
  if(!base) base = 100;
  return Math.floor(Math.random() * base);
}
