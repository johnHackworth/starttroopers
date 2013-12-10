Crafty.c("IndustryButtoner", {
  init: function() {

  },
  createCompaniesButton: function() {
    this.offersButton = Crafty.e('Button');
    this.offersButton.set({
      color: '#AA9900',
      text: "Companies",
      x: 5,
      y: 160,
      onClick: function() {
        Crafty.trigger('CompanyListSelected');
      }
    });
  },
  createOffersButton: function() {
    this.offersButton = Crafty.e('Button');
    this.offersButton.set({
      color: '#AAAA00',
      text: "Job offers",
      x: 5,
      y: 80,
      onClick: function() {
        Crafty.trigger('JobOffersSelected');
      }
    });
  },
  createGurusButton: function() {
    this.offersButton = Crafty.e('Button');
    this.offersButton.set({
      color: '#00AAAA',
      text: "Famous people",
      x: 5,
      y: 120,
      onClick: function() {
        Crafty.trigger('IndustryHubSelected');
      }
    });
  },
  createIndustryButtoner: function() {
    this.createOffersButton();
    this.createGurusButton();
    this.createCompaniesButton();
  }

})
