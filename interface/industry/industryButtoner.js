Crafty.c("IndustryButtoner", {
  init: function() {

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
  createIndustryButtoner: function() {
    this.createOffersButton();
  }

})
