Crafty.c("EmployeeSearchView", {
  offerDataHTML: '<div class="offerData">' +
    '<div class="type">%TYPE%</div>' +
    '<div class="published">%PUBLISHED%</div>' +
    '<div class="maxWage">maximum wage: <span>%MAXWAGE%$</span></div>' +
    '<div class="minExperience">%MINEXPERIENCE% years of experience at least</div>' +
    '</div>',
  MAX_PER_PAGE: 8,
  firstElement: 0,
  init: function() {
    this.requires('DOM, Text, Color, IndustryButtoner, Faces');
    this.attr({w:1200, h:700, x: 0, y: 0})
    this.color('rgba(200,50,50,.85)');
    this.company = tr.app.director.company;
    this.offer = this.company.world.workOffers[tr.app.director.currentOffer];
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.createIndustryButtoner()
    this.renderHeader();
    this.renderOfferData();
    this.renderApplycants();
  },
  renderHeader: function() {
    this.header = Crafty.e('HeaderText');
    this.header.setName('Employee Search', 'This are the results of the search process');
    this.header.attr({x: 200})
    this.header.render();
  },
  renderOfferData: function() {
    this.offerDataView = Crafty.e('2D, DOM, HTML');
    this.offerDataView.append(
      this.offerDataHTML
        .replace(/%TYPE%/g, this.offer.type)
        .replace(/%PUBLISHED%/g, tr.turnToDate(this.offer.published).toDateString())
        .replace(/%MAXWAGE%/g, this.offer.maxWage? this.offer.maxWage : 'Any ')
        .replace(/%MINEXPERIENCE%/g, this.offer.minExperience)
    )
    this.offerDataView.attr({x:200, y:180, w:900, h:30});
  },
  renderApplycants: function() {
    this.peopleList = Crafty.e('PeopleList');
    this.peopleList.set({
      people: this.offer.curriculae,
      x: 200,
      y: 250,
      stepX: 180,
      stepY: 90,
      additionalInfo: 'getPersonalHireData',
      maxPerPage: 16
    })
    this.peopleList.renderPeople()

  }
})
