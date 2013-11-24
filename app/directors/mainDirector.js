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
  "sports", "gadgets", "fashion", "videogames", "cinema", "music", "hiking", "travel", "cars", "DIY", "cooking", "art", "literature", "sci-fi", "board games"
]
window.tr.directors.MainDirector.prototype = {
  backgroundColor: '#CCCCCC',
  start: function() {
    Crafty.init();
    Crafty.scene('Office')
    Crafty.bind("PersonSelected", this.personProfile.bind(this));
    Crafty.bind("OfficeSelected", this.office.bind(this));
    Crafty.bind("SocialSelected", this.socialProfile.bind(this));
    Crafty.bind("ProductSelected", this.productProfile.bind(this));
    Crafty.bind("ProjectSelected", this.projectSelected.bind(this));
    Crafty.bind("BusinessSelected", this.businessSelected.bind(this));
    Crafty.bind("PersonProjectsSelected", this.personProjectsSelected.bind(this));
    Crafty.bind("InvestorSelected", this.investorSelected.bind(this));

  },
  personProfile: function() {
    Crafty.scene('PersonProfile')
  },
  socialProfile: function() {
    Crafty.scene('PersonSocial')
  },
  office: function() {
    Crafty.scene('Office')
  },
  productProfile: function() {
    Crafty.scene('Product')
  },
  projectSelected: function() {
    Crafty.scene('Project')
  },
  businessSelected: function() {
    Crafty.scene('Business')
  },
  personProjectsSelected: function() {
    Crafty.scene('PersonProjects')
  },
  investorSelected: function() {
    Crafty.scene('Investor')
  }

}
