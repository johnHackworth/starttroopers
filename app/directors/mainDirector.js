window.tr = window.tr || {};
window.tr.directors = window.tr.directors || {};


window.tr.directors.MainDirector = function() {

};
window.tr.config = {
  width: 1280,
  height: 800,
  fps: 50
}

window.tr.hobbies = [
  "sports", "fashion", "videogames", "cinema", "music", "hiking", "travel", "cars", "DIY", "cooking"
]
window.tr.directors.MainDirector.prototype = {
  backgroundColor: '#CCCCCC',
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    // Crafty.init(window.tr.config.width, window.tr.config.height);
    // Crafty.background(this.backgroundColor);
    // this.game = new tr.models.GameController({});
    Crafty.init();
    Crafty.scene('Office')
  },
}
