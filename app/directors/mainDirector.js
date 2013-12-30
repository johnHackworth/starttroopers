window.tr = window.tr || {};
window.tr.directors = window.tr.directors || {};


window.tr.directors.MainDirector = function(options) {
  this.history = options.history;
};
window.tr.config = {
  width: 1280,
  height: 800,
  fps: 50
}
window.tr.getScale = function() {
  var scale = window.innerWidth / 1200;
  var scale2 = window.innerHeight / 800;
  if(scale2 < scale) {
    scale = scale2;
  }
  if(scale > 1) {
    scale = 1;
  }
  return scale;
}

window.tr.hobbies = [
  "sports", "gadgets", "fashion", "videogames",
  "cinema", "music", "hiking", "travel", "cars",
  "DIY", "cooking", "art", "literature", "sci-fi",
  "board games", "technology", "religion", "socialize"
]
window.tr.directors.MainDirector.prototype = {
  backgroundColor: '#CCCCCC',
  start: function() {
    Crafty.init();
    Crafty.bind('SceneChange', function() {
      var width = tr.config.width * tr.getScale();

      Crafty.viewport.scale(tr.getScale());
    })
    Crafty.scene('MainMenu')
    Crafty.bind("PersonSelected", this.personProfile.bind(this));
    Crafty.bind("OfficeSelected", this.office.bind(this));
    Crafty.bind("SocialSelected", this.socialProfile.bind(this));
    Crafty.bind("ProductSelected", this.productProfile.bind(this));
    Crafty.bind("ProjectSelected", this.projectSelected.bind(this));
    Crafty.bind("BusinessSelected", this.businessSelected.bind(this));
    Crafty.bind("PersonProjectsSelected", this.personProjectsSelected.bind(this));
    Crafty.bind("InvestorSelected", this.investorSelected.bind(this));
    Crafty.bind("MarketingSelected", this.marketingSelected.bind(this));
    Crafty.bind("MarketingResourcesSelected", this.marketingResourcesSelected.bind(this));
    Crafty.bind("IndustryHubSelected", this.industryHubSelected.bind(this));
    Crafty.bind("JobOffersSelected", this.jobOffersSelected.bind(this));
    Crafty.bind("OfferCreatorSelected", this.offerCreatorSelected.bind(this));
    Crafty.bind("OfferViewSelected", this.offerViewSelected.bind(this));
    Crafty.bind("PersonContractSelected", this.personContractSelected.bind(this));
    Crafty.bind("PersonCreatorSelected", this.personCreatorSelected.bind(this));
    Crafty.bind("CompanyListSelected", this.companyListSelected.bind(this));
    Crafty.bind("CompanyViewSelected", this.companyViewSelected.bind(this));
    Crafty.bind("MainMenuSelected", this.mainMenuSelected.bind(this));
    Crafty.bind("PersonInteractionSelected", this.interactionViewSelected.bind(this));
    Crafty.bind("PersonWorkLogSelected", this.personWorkLogSelected.bind(this));

  },
  historyBack: function() {
    var previous = this.history.prev();
    this.selectedId = previous.id;
    this.history.dontAddNext();
    Crafty.trigger(previous.tab, previous.id);
  },
  historyNext: function() {
    var previous = this.history.next();
    this.selectedId = previous.id;
    this.history.dontAddNext();
    Crafty.trigger(previous.tab, previous.id);
  },
  createWorld: function(person, company) {
    this.world = new window.tr.models.World({});
    window.world = tr.app.director.world;
    if(company) {
      this.company = company
    } else {
      this.company = new window.tr.models.Company({})
      this.company.initProduct({
        name: "The social network",
        world: this.world
      });
      this.company.product.defineSocialNetwork();
      this.company.initProject("basicSite");
    }

    this.world.setPlayer(window.tr.app.director.company, person);
    window.comp = window.tr.app.director.company;
  },
  personProfile: function(person) {
    this.history.add('PersonSelected', person);
    this.selectedId = person;
    Crafty.scene('PersonProfile')
  },
  socialProfile: function() {
    this.history.add('SocialSelected', this.selectedId);
    Crafty.scene('PersonSocial')
  },
  office: function() {
    this.history.add('OfficeSelected', this.selectedId);
    Crafty.scene('Office')
  },
  productProfile: function() {
    this.history.add('ProductSelected', this.selectedId);
    Crafty.scene('Product')
  },
  projectSelected: function(project) {
    this.history.add('ProjectSelected', project);
    if(project) {
      this.selectedId = project;
    }
    Crafty.scene('Project')
  },
  businessSelected: function() {
    this.history.add('BusinessSelected', this.selectedId);
    Crafty.scene('Business')
  },
  personProjectsSelected: function() {
    this.history.add('PersonProjectsSelected', this.selectedId);
    Crafty.scene('PersonProjects')
  },
  investorSelected: function() {
    this.history.add('InvestorSelected', this.selectedId);
    Crafty.scene('Investor')
  },
  marketingSelected: function() {
    this.history.add('MarketingSelected', this.selectedId);
    Crafty.scene('Marketing')
  },
  marketingResourcesSelected: function() {
    this.history.add('MarketingResourcesSelected', this.selectedId);
    Crafty.scene('MarketingResources')
  },
  industryHubSelected: function() {
    this.history.add('IndustryHubSelected');
    Crafty.scene('IndustryHub')
  },
  jobOffersSelected: function() {
    this.history.add('JobsOffersSelected', this.selectedId);
    Crafty.scene('JobOffers')
  },
  offerCreatorSelected: function() {
    this.history.add('OfferCreatorSelected', this.selectedId);
    Crafty.scene('JobOfferCreator')
  },
  offerViewSelected: function() {
    this.history.add('OfferViewSelected');
    Crafty.scene('EmployeeSearch')
  },
  personContractSelected: function() {

    this.history.add('PersonContractSelected', this.selectedId);
    Crafty.scene('PersonContract')
  },
  personCreatorSelected: function() {
    Crafty.scene('CharCreator')
  },
  companyListSelected: function() {
    this.history.add('CompanyListSelected', this.selectedId);
    Crafty.scene('CompanyList')
  },
  companyViewSelected: function(company) {

    this.history.add('CompanyViewSelected', company);
    if(company) {
      this.selectedId = company;
    }
    Crafty.scene('CompanyView')
  },
  mainMenuSelected: function() {
    Crafty.scene('MainMenu')
  },
  interactionViewSelected: function() {
    this.history.add('PersonInteractionSelected', this.selectedId);
    Crafty.scene('PersonInteraction');
  },
  personWorkLogSelected: function() {
    this.history.add('PersonWorkLogSelected', this.selectedId);
    Crafty.scene('PersonWorkLog');
  },

}
