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
    Crafty.init();
    Crafty.scene('Office')
    Crafty.bind("PersonSelected", this.personProfile.bind(this));
    Crafty.bind("OfficeSelected", this.office.bind(this));
  },
  personProfile: function() {
    Crafty.scene('PersonProfile')
  },
  office: function() {
    Crafty.scene('Office')
  }

}
