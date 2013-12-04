Crafty.c('PersonContractSheet', {
  personalDataHTML: "<div class='socialData'>"+
  "<div class='name'>%NAME%'s hiring information</div>"+
  // "<div class='sociability'>Sociability: %SOCIABILITY%</div>"+
  "</div>",
  offerDataHMTL: "<div class='personalOfferData'>"+
      "<div class='interest'>Interest in your company: </div>"+
      "<div class='wage'>Current wage: %CURRENTWAGE%$</div>"+
      "<div class='share'>Share of the company: %EQUITY%%</div>"+
      "<div class='offerMoney'>Offered wage: </div>"+
      "<div class='equity'>Equity: </div>"+
    "</div>",
  alreadyOfferDataHMTL: "<div class='personalOfferData'>"+
      "<div class='interest'>Interest in your company: </div>"+
      "<div class='wage'>Current wage: %CURRENTWAGE%$</div>"+
      "<div class='offered'>You've made an offer. Soon you'll get an answer </div>"+
    "</div>",
  init: function() {
    this.requires('2D, DOM, Color, Faces, PersonProfileButtoner');
    this.attr({w:1200, h:700, x: 0, y: 0});
    this.color('rgb(104,154,104)');
    this.person = tr.app.director.selectedPerson;
    this.company = tr.app.director.company;
    this.statusBar = Crafty.e('StatusBar, PersonProfileButtoner');
    this.statusBar.createOfficeButton();
    this.render();
    this.buttons = [];
    this.createPersonFace();
    this.createButtoner();
    this.renderPersonData();
    this.renderOfferOptions();
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },

  renderPersonData: function() {
    this.personalData = Crafty.e('2D, DOM, HTML');
    this.personalData.attr({
      x: 250,
      y: 70,
      w: 600,
      h: 300
    }).append(
      this.personalDataHTML
      .replace(/%NAME%/g, this.person.name)
      .replace(/%SOCIABILITY%/g, this.person.sociability)
    );
  },
  render: function() {
    for(var n in this.buttons) {
      this.buttons[n].render();
    }
  },
  renderOfferOptions: function() {
    if(!this.person.acceptingOffer &&
      !this.person.rejectingOfferOf &&
      !this.person.negotiatingWorkOffer ) {
      this.renderOfferCreator();
    } else {
      this.renderOffered();
    }
  },
  renderOffered: function() {
    this.offerData = Crafty.e('2D, DOM, HTML');
    this.offerData
      .replace(this.alreadyOfferDataHMTL
        .replace(/%CURRENTWAGE%/g, this.person.currentWage)
    );
    this.offerData.attr({x: 300, y: 150, w: 800, h: 600  })
    this.renderPerception();
  },
  renderOfferCreator: function() {
    this.contractData = Crafty.e('2D, DOM, HTML');
    this.contractData.replace(this.offerDataHMTL
      .replace(/%EQUITY%/g, this.person.companyShare)
      .replace(/%CURRENTWAGE%/g, this.person.currentWage)
    )
    this.contractData.attr({x: 300, y: 150, w: 800, h: 600  })
    this.wageSlider = Crafty.e('Slider');
    this.wageSlider.set({x: 500, y: 300, w: 300, max: 100000, showValue: true, subfix: '$'})
    this.wageSlider.setValue(this.person.currentWage);
    this.equitySlider = Crafty.e('Slider');
    this.equitySlider.set({x: 500, y: 370, w: 300, max: 10, showValue: true, subfix: '%', decimals: 2})

    this.offerButton = Crafty.e('Button')
    this.offerButton.set({
      color: '#AAAA00',
      text: "Offer",
      x: 300,
      y: 450,
      onClick: this.createOffer.bind(this)
    });

    this.renderPerception();
  },
  createOffer: function() {
    var wage = this.wageSlider.getValue();
    var equity = this.equitySlider.getValue();
    this.person.getOffer(wage, equity, this.company);
    Crafty.trigger('PersonContractSelected')
  },
  renderPerception: function() {
    var perception = this.person.perceptionOfTheCompany(this.company);
    this.perceptionBar = Crafty.e('ProgressBar');
    this.perceptionBar.setOptions({
      w: 100,
      h: 15,
      y: 160,
      x: 500
    });
    this.perceptionBar.setValue(perception);
  }

})
