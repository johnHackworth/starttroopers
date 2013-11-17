window.tr = window.tr || {};
window.tr.randInt = function(base) {
  if(!base) base = 100;
  return Math.floor(Math.random() * base);
}
window.tr.baseDate = new Date("2014/01/01");
window.tr.turnToDate = function(turn) {
  var date = new Date("2014/01/01");
  date.setDate(date.getDate() + turn)
  return date
}
