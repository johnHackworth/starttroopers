window.tr = window.tr || {};
window.tr.directors = window.tr.directors || {};


window.tr.directors.MainDirector = function() {

};
window.tr.config = {
  width: 1280,
  height: 700,
  fps: 50
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
      var scale = window.innerWidth / 1200;
      if(scale < 1) {
        Crafty.viewport.scale(scale)
      }
    })
    Crafty.scene('Office')
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
  },
  personProfile: function(id) {
    if(id) {
      for(var n in this.world.people) {
        if(this.world.people[n].id === id) {
          this.selectedPerson = this.world.people[n];
          Crafty.scene('PersonProfile')
          return;
        }
      }
    }
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
  projectSelected: function(project) {
    if(project) {
      this.selectedProject = project;
    }
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
  },
  marketingSelected: function() {
    Crafty.scene('Marketing')
  },
  marketingResourcesSelected: function() {
    Crafty.scene('MarketingResources')
  },
  industryHubSelected: function() {
    Crafty.scene('IndustryHub')
  },
  jobOffersSelected: function() {
    Crafty.scene('JobOffers')
  },
  offerCreatorSelected: function() {
    Crafty.scene('JobOfferCreator')
  },
  offerViewSelected: function() {
    Crafty.scene('EmployeeSearch')
  },
  personContractSelected: function() {
    Crafty.scene('PersonContract')
  },
  personCreatorSelected: function() {
    Crafty.scene('CharCreator')
  },
  companyListSelected: function() {
    Crafty.scene('CompanyList')
  },
  companyViewSelected: function(company) {
    if(company) {
      this.selectedCompany = company;
    }
    Crafty.scene('CompanyView')
  }

}
