Crafty.c("IndustryHubView", {
  init: function() {
    this.requires('DOM, Text, Color, IndustryButtoner');
    this.attr({w:1200, h: 800, x: 0, y: 0})
    this.color('rgba(200,200,200,.85)');
    this.company = tr.app.director.company;
    this.company.world.people.sort(function(a,b) { return b.followers - a.followers;})
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.createTitle();
    this.createIndustryButtoner();
    this.renderPeople();
  },
  createTitle: function() {
    this.currentJobOffersTitle = Crafty.e('HeaderText');
    this.currentJobOffersTitle.setName('Famous people', 'who builds the web');
    this.currentJobOffersTitle.attr({x: 200})
    this.currentJobOffersTitle.render();
  },
  renderPeople: function() {
    this.peopleList = Crafty.e('PeopleList');
    this.peopleList.set({
      people: this.company.world.people,
      x: 220,
      y: 180,
      stepX: 150,
      stepY: 120,
      additionalInfo: 'getPersonalHireData',
      maxPerPage: 20,
      faceSize: 50
    })
    this.peopleList.renderPeople()

  }


})
