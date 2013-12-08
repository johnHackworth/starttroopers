Crafty.c("JobOffersView", {
  jobOfferHTML: '<div class="jobOffer">' +
    '<div class="type">%TYPE%</div>' +
    '<div class="date">%DATE%</div>' +
    '<div class="type">%APPLICANTS%</div>' +
    '</div>',
  init: function() {
    this.requires('DOM, Text, Color, IndustryButtoner');
    this.attr({w:1200, h: 800, x: 0, y: 0})
    this.color('rgba(200,50,50,.85)');
    this.company = tr.app.director.company;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.createIndustryButtoner()
    this.currentJobOffers();
    this.renderOfferCreatorButton();

  },
  currentJobOffers: function() {
    var offers = this.company.world.workOffers;
    this.offerViews = [];
    var x = 200;
    var y = 220;
    this.currentJobOffersTitle = Crafty.e('HeaderText');
    this.currentJobOffersTitle.setName('Employee Search', 'Current job offers');
    this.currentJobOffersTitle.attr({x: 200})
    this.currentJobOffersTitle.render();
    for(var n in offers) {
      var offerView = Crafty.e('2D, DOM, HTML, Mouse');
      offerView.replace(this.jobOfferHTML
        .replace(/%TYPE%/g, offers[n].type)
        .replace(/%DATE%/g, tr.turnToDate(offers[n].published).toDateString())
        .replace(/%APPLICANTS%/g, offers[n].curriculae.length)
      )
      offerView.attr({
        x: x,
        y: y,
        w: 600,
        h: 50
      })
      offerView.bind('Click', this.createOfferClickResponse(n));
      this.offerViews.push(offerView);
      y += 60;
    }
    if(offers.length === 0) {
      this.offersWarning = Crafty.e('2D, DOM, HTML');
      this.offersWarning.append('<div class="offersWarning">There are no open processes right now </div>');
      this.offersWarning.attr({x: 200, y: 150, w: 600, h: 30})
    }
  },
  createOfferClickResponse: function(nParam) {
    var n = nParam;
    return function() {
      tr.app.director.currentOffer = n;
      Crafty.trigger('OfferViewSelected')
    }

  },
  renderOfferCreatorButton: function() {
    this.offerCreatorButton = Crafty.e('Button');
    this.offerCreatorButton.set({
      color: '#007777',
      text: "Post new offer",
      x: 1000,
      y: 70,
      onClick: function() {
        Crafty.trigger('OfferCreatorSelected');
      }
    });
  }
})
