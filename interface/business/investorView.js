Crafty.c('InvestorView', {
  interestHeaderHTML: "<div class='interestHeaders'>"+
  "<div class='interestHeader'>Knowledge</div>"+
  "<div class='interestHeader'>Hype</div>"+
  "<div class='interestHeader'>Perception</div>"+
  "</div>",
  offersHeaderHTML: "<div class='offersHeaders'>"+
  "Offers for your company"+
  "</div>",
  otherDataHTML: '<div class="projectOtherData">%NAME%</div>',
  init: function() {
    this.requires('2D, DOM, Color, Faces');
    this.attr({w:1190, h:790, x: 5, y: 5});
    this.color('rgb(154,104,104)');
    this.company = tr.app.director.company;
    this.investor = tr.app.director.selectedInvestor
    this.offer = this.investor.offer;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.renderTitle();
    this.renderInterests();
    this.renderOffersSection();
    this.renderAvailablePeople();
    this.renderNegotiator();
    this.render();
  },
  renderTitle: function() {
    this.headerTitle = Crafty.e('HeaderText');
    this.headerTitle.setName(this.investor.name, 'Investor profile');
    this.headerTitle.render();
  },
  renderOffersSection: function() {
      this.interestHeader = Crafty.e('2D, DOM, HTML')
      this.interestHeader.attr({x: 600, w: 400, y: 175, h: 30})
      this.interestHeader.replace(this.offersHeaderHTML);
      var i = 0;
      if(this.offer) {
        var offer = Crafty.e('OfferView')
        offer.setOffer(this.offer, this.company)
        offer.attr({
          x: 600,
          y: 200 + 50 * i,
          w: 400,
          h: 50
        });
        offer.renderOffer();
        i++;
      }
  },
  renderInterests: function() {
      this.interestHeader = Crafty.e('2D, DOM, HTML')
      this.interestHeader.attr({x: 20, w: 1000, y: 175, h: 30})
      this.interestHeader.replace(this.interestHeaderHTML)
      var knowledgeProgressBar = Crafty.e('ProgressBar');
      knowledgeProgressBar.setOptions({
        w: 100,
        h: 20,
        y: 200,
        x: 20
      });
      knowledgeProgressBar.setValue(this.investor.knowledgeAboutTheCompany);
      var hypeAboutTheCompanyBar = Crafty.e('ProgressBar');
      hypeAboutTheCompanyBar.setOptions({
        w: 100,
        h: 20,
        y: 200,
        x: 150
      });
      hypeAboutTheCompanyBar.setValue(this.investor.hypeAboutTheCompany);
      var companyPerceptionBar = Crafty.e('ProgressBar');
      companyPerceptionBar.setOptions({
        w: 100,
        h: 20,
        y: 200,
        x: 280
      });
      companyPerceptionBar.setValue(this.investor.companyPerception);

  },
  renderAvailablePeople: function() {
    var self = this;
    var i = 0;
    var x = 30;
    var y = 400;
    var title = Crafty.e('HTMLText');
    title.set({x:20, y:360, w: 300, h:50,z:9999, text: 'Available for negotiation:', class: ''})
    for(var n in this.company.people) {
      if(this.company.people[n].raisingFunds) {
        var other = this.company.people[n];
        var otherFace = this.createOtherFace(other, x, y);
        otherFace.overrideClick(this.generateAvailableNegociatorClick(other))
        var otherName = Crafty.e('2D, HTML, DOM');
        otherName.attr({
          x: x-25,
          y: y - 10,
          w: 100,
          h: 30
        })
        var name = other.name;
        otherName.append(this.otherDataHTML.replace(/%NAME%/g, name));

        x += 60;
        if(x > 600) {
          x = 50;
          y += 60;
        }
        i++;
      }
      this.companyPeopleY = y+130;

      }
  },
  generateAvailableNegociatorClick: function(personParam) {
    var person = personParam;
    var self = this;
    return function() {
      person.negotiateOffer(self.offer)
      self.renderNegotiator();
    }
  },
  renderNegotiator: function() {
    if(this.negotiatorTitle) this.negotiatorTitle.destroy();
    if(this.negotiatorFace) this.negotiatorFace.destroy();
    if(this.negotiatorName) this.negotiatorName.destroy();
    if(this.offer) {
      var negotiator = this.offer.negotiator;
      this.negotiatorTitle = Crafty.e('HTMLText');
      this.negotiatorTitle.set({x:600, y:360, w: 300, h:50,z:9999, text: 'Negotiator:', class: ''})
      if(negotiator) {
        this.negotiatorFace = this.createOtherFace(negotiator, 610, 400);
        this.negotiatorName = Crafty.e('2D, HTML, DOM');
        this.negotiatorName.attr({
          x: 585,
          y: 390,
          w: 100,
          h: 30
        })
        var name = negotiator.name;
        this.negotiatorName.append(this.otherDataHTML.replace(/%NAME%/g, name));
        this.renderNegotiatorOptions();
      }
    }
  },
  renderNegotiatorOptions: function() {
    this.reduceShareCheck = Crafty.e('PropertyCheckbox')
    this.reduceShareCheck.bindWithProperty(this.offer, "reduceShare", "Reduce the negotiated reduceShare");
    this.reduceShareCheck.attr({x: 700, y: 400, w: 400, h: 30});
    this.reduceShareCheck.render();
    this.improveOfferCheck = Crafty.e('PropertyCheckbox')
    this.improveOfferCheck.bindWithProperty(this.offer, "improveOffer", "Improve the value of the offer");
    this.improveOfferCheck.attr({x: 700, y: 430, w: 400, h: 30})
    this.improveOfferCheck.render();
  },
  render: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  }

})
