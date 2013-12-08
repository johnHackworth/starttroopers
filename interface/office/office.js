Crafty.c('OfficeFloor', {
  init: function() {
    this.requires('DOM, Text, Color');
    this.attr({w:1200, h: 800, x: 0, y: 0})
    this.color('rgba(104,104,204,.85)');
    this.company = tr.app.director.company;
    this.render();

    this.personViews = [];
    this.createPersons();
    this.createStatusBar();
    this.createCompanyLog();
    this.bind('Remote', this.delete.bind(this));
  },
  delete: function() {
    this.company.off('newHire')
    this.company.off('newTurn');
  },
  render: function() {
    this.ready = true;
    Crafty.trigger("Change");
  },
  createPersons: function() {
    this.i = 0;
    this.personY = 70;
    this.personX = 30;
    for(var n in this.company.people) {
      var personView = Crafty.e('Person');
      personView.assignPerson({
        person: this.company.people[n],
        x: this.personX,
        y: this.personY
      })
      this.personX += 110;
      this.i++
      if(this.i % 6 === 0) {
        this.personX = 30;
        this.personY += 120;
      }
      this.personViews.push(personView);
    }
    this.company.on('newHire', this.addNewHire.bind(this));
  },
  addNewHire: function(person) {
    var personView = Crafty.e('Person');
    personView.assignPerson({
      person: person,
      x: this.personX,
      y: this.personY
    })
    this.personX += 110;
    this.i++
    if(this.i % 6 === 0) {
      this.personX = 30;
      this.personY += 120;
    }
    this.personViews.push(personView);
  },
  createStatusBar: function() {
    var self = this;
    this.statusBar = Crafty.e('StatusBar');
    this.statusBar.bind('newTurn', function() {
      self.trigger('change:background')
    })
  },
  createCompanyLog: function() {
    this.companyLog = Crafty.e('LogView');
    this.companyLog.setOptions({
      x: 650,
      y: 70,
      logged: this.company,
      title: "What's happening?",
      h: 100,
      w: 500
    });
    this.companyLog.render()
    this.company.on("newTurn", this.companyLog.render.bind(this.companyLog))
  }
})
