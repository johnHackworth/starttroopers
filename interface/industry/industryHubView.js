Crafty.c("IndustryHubView", {
  init: function() {
    this.requires('DOM, Text, Color, IndustryButtoner');
    this.attr({w:1200, h: 800, x: 0, y: 0})
    this.color('rgba(200,200,200,.85)');
    this.company = tr.app.director.company;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.createOfficeButton();
    this.createIndustryButtoner();
    this.renderPeople();
  },
  renderPeople: function() {
    this.peopleList = Crafty.e('PeopleList');
    this.peopleList.set({
      people: this.company.world.people,
      x: 220,
      y: 60,
      stepX: 150,
      stepY: 120,
      additionalInfo: 'getPersonalHireData',
      maxPerPage: 25
    })
    this.peopleList.renderPeople()

  }


})
